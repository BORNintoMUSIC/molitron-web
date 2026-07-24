/**
 * Compress public images in-place (max dimensions + quality).
 * Run: node scripts/optimize-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images");
const EXCLUDED_ROOTS = [path.resolve("public/images/previous-customers/optimized")];
const MAX_EDGE = 1920;
const JPEG_QUALITY = 78;
const PNG_QUALITY = 80;

async function* walk(dir) {
  if (EXCLUDED_ROOTS.includes(path.resolve(dir))) return;

  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) yield full;
  }
}

async function optimizeFile(file) {
  const ext = path.extname(file).toLowerCase();
  const before = (await fs.stat(file)).size;
  const img = sharp(file, { failOn: "none" });
  const meta = await img.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  let pipeline = sharp(file, { failOn: "none" }).rotate();
  if (w > MAX_EDGE || h > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: w >= h ? MAX_EDGE : undefined,
      height: h > w ? MAX_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const tmp = `${file}.tmp`;
  if (ext === ".png") {
    await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, effort: 8 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp);
  }

  const after = (await fs.stat(tmp)).size;
  if (after < before) {
    await fs.rename(tmp, file);
    console.log(
      `✓ ${path.relative(process.cwd(), file)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
    );
  } else {
    await fs.unlink(tmp);
    console.log(`· ${path.relative(process.cwd(), file)}  kept (${(before / 1024).toFixed(0)}KB)`);
  }
}

async function main() {
  let n = 0;
  for await (const file of walk(ROOT)) {
    try {
      await optimizeFile(file);
      n++;
    } catch (err) {
      console.warn(`! skip ${file}:`, err.message);
    }
  }
  console.log(`Done. Processed ${n} files.`);
}

main();
