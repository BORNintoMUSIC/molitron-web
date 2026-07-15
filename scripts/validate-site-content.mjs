import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const mode = process.argv[2];
if (!new Set(["--changed", "--all"]).has(mode) || process.argv.length !== 3) {
  console.error("Usage: node scripts/validate-site-content.mjs --changed|--all");
  process.exit(2);
}

const ROOT = process.cwd();
const PUBLIC_ROOT = path.join(ROOT, "public");
const errors = [];

function relative(file) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

async function walk(dir, extensions) {
  const files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full, extensions)));
    } else if (!extensions || extensions.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

async function isFile(file) {
  try {
    return (await fs.stat(file)).isFile();
  } catch {
    return false;
  }
}

function gitLines(args) {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" })
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    errors.push(`Unable to inspect Git changes: ${error.message}`);
    return [];
  }
}

async function validateAssetReferences() {
  const sourceFiles = await walk(
    path.join(ROOT, "src"),
    new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"]),
  );
  sourceFiles.push(path.join(ROOT, "next.config.ts"));

  const references = new Map();
  const literalAsset = /["'`](\/(?:docs\/[^"'`\s?#)]+\.pdf|images\/[^"'`\s?#)]+))["'`]/g;

  for (const sourceFile of sourceFiles) {
    const content = await fs.readFile(sourceFile, "utf8");
    for (const match of content.matchAll(literalAsset)) {
      const publicPath = match[1];
      if (publicPath.includes(":") || publicPath.includes("*")) continue;
      const locations = references.get(publicPath) ?? [];
      locations.push(relative(sourceFile));
      references.set(publicPath, locations);
    }
  }

  for (const [publicPath, locations] of references) {
    const target = path.join(PUBLIC_ROOT, ...publicPath.slice(1).split("/"));
    if (!(await isFile(target))) {
      errors.push(`Missing public asset ${publicPath} (referenced by ${locations.join(", ")})`);
    }
  }

  return references;
}

async function validatePdfs(references) {
  const docsDir = path.join(PUBLIC_ROOT, "docs");
  const publicPdfs = (await fs.readdir(docsDir))
    .filter((name) => name.toLowerCase().endsWith(".pdf"))
    .sort();

  for (const name of publicPdfs) {
    const publicPath = `/docs/${name}`;
    if (!references.has(publicPath)) {
      errors.push(`Public PDF ${publicPath} has no source or Next.js config reference`);
    }
  }

  let namesToValidate = publicPdfs;
  if (mode === "--changed") {
    const changed = gitLines([
      "diff",
      "--name-only",
      "--diff-filter=ACMRTUXB",
      "HEAD",
      "--",
      "public/docs",
    ]);
    const untracked = gitLines([
      "ls-files",
      "--others",
      "--exclude-standard",
      "--",
      "public/docs",
    ]);
    namesToValidate = [...new Set([...changed, ...untracked])]
      .filter((name) => name.toLowerCase().endsWith(".pdf"))
      .map((name) => path.basename(name));
  }

  for (const name of namesToValidate) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.pdf$/.test(name)) {
      errors.push(`PDF filename must be lowercase kebab-case: public/docs/${name}`);
    }

    const file = path.join(docsDir, name);
    if (!(await isFile(file))) {
      errors.push(`Changed PDF is missing: public/docs/${name}`);
      continue;
    }

    const handle = await fs.open(file, "r");
    try {
      const header = Buffer.alloc(5);
      const { bytesRead } = await handle.read(header, 0, header.length, 0);
      if (bytesRead !== 5 || header.toString("ascii") !== "%PDF-") {
        errors.push(`Invalid PDF header: public/docs/${name}`);
      }
    } finally {
      await handle.close();
    }
  }

  return publicPdfs.length;
}

async function validateCustomerLogos() {
  const registryFile = path.join(ROOT, "src/lib/customer-logos.ts");
  const registry = await fs.readFile(registryFile, "utf8");
  const customerSection = registry.match(
    /export const customerLogos = \{([\s\S]*?)\n\} as const satisfies Record<string, CustomerLogo>;/,
  )?.[1];
  const mappingSection = registry.match(
    /const logoKeyByReference = \{([\s\S]*?)\n\} as const satisfies Record<string, CustomerLogoKey>;/,
  )?.[1];
  const featuredSection = registry.match(
    /export const featuredCustomerReferences = \[([\s\S]*?)\n\] as const;/,
  )?.[1];

  if (!customerSection || !mappingSection || !featuredSection) {
    errors.push("Unable to parse src/lib/customer-logos.ts registry structure");
    return;
  }

  const logoKeys = new Set(
    [...customerSection.matchAll(/^  (?:"([^"]+)"|([a-z0-9-]+)): \{/gm)].map(
      (match) => match[1] ?? match[2],
    ),
  );
  const logoSources = [...customerSection.matchAll(/src: "([^"]+)"/g)].map(
    (match) => match[1],
  );
  const mappings = new Map(
    [...mappingSection.matchAll(/^  (?:"([^"]+)"|([A-Za-z][A-Za-z0-9]*)): "([^"]+)",?$/gm)].map(
      (match) => [match[1] ?? match[2], match[3]],
    ),
  );
  const featured = [...featuredSection.matchAll(/"([^"]+)"/g)].map((match) => match[1]);

  if (logoKeys.size !== logoSources.length) {
    errors.push("Customer logo keys and source paths are out of sync");
  }

  for (const source of logoSources) {
    const target = path.join(PUBLIC_ROOT, ...source.slice(1).split("/"));
    if (!(await isFile(target))) errors.push(`Missing customer logo file: ${source}`);
  }
  for (const [reference, key] of mappings) {
    if (!logoKeys.has(key)) errors.push(`Customer reference ${reference} uses unknown logo key ${key}`);
  }
  for (const reference of featured) {
    if (!mappings.has(reference)) errors.push(`Featured customer has no logo mapping: ${reference}`);
  }

  const logoRoot = path.join(PUBLIC_ROOT, "images/previous-customers");
  const rawDirectories = (await fs.readdir(logoRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name !== "optimized")
    .map((entry) => entry.name);
  if (rawDirectories.length) {
    errors.push(`Raw customer logo directories must stay outside public/: ${rawDirectories.join(", ")}`);
  }
}

async function validateRedirects() {
  const config = await fs.readFile(path.join(ROOT, "next.config.ts"), "utf8");
  const redirectSection = config.match(
    /async redirects\(\) \{([\s\S]*?)\r?\n  \},\r?\n\r?\n  async headers/,
  )?.[1];
  if (!redirectSection) {
    errors.push("Unable to parse redirects in next.config.ts");
    return;
  }

  const seen = new Set();
  for (const match of redirectSection.matchAll(/source:\s*(?:\n\s*)?"([^"]+)"/g)) {
    if (seen.has(match[1])) errors.push(`Duplicate redirect source in next.config.ts: ${match[1]}`);
    seen.add(match[1]);
  }
}

const references = await validateAssetReferences();
const pdfCount = await validatePdfs(references);
await validateCustomerLogos();
await validateRedirects();

if (errors.length) {
  console.error(`Site content validation failed (${mode.slice(2)}):`);
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Site content validation passed (${mode.slice(2)}; ${pdfCount} PDFs; ${references.size} asset references).`,
);
