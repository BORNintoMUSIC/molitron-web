/**
 * Create non-destructive, web-ready derivatives from approved source masters.
 *
 * Run from the repository root:
 *   node scripts/prepare-site-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = path.resolve("assets/source-images/incoming");
const OUTPUT = path.resolve("public/images/remastered");

const jobs = [
  ["moas/Molitron Odor Abatement System Closed.png", "moas-closed-v2.webp", "cutout"],
  ["moas/molitron-order-abatement-system-open-2026.png", "moas-open-v2.webp", "cutout"],
  ["moas/Four Molitron Odor Abatement Systems.png", "moas-four-units-v2.webp", "field"],
  ["moas/MOAS Installation on Wall Full Picture_R2.png", "moas-wall-installation-v2.webp", "field"],
  ["moas/MOAS Installation On Wall_R1.png", "moas-wall-detail-v2.webp", "field"],
  ["epfa/PCU Pollution Control EPFA Closed.png", "epfa-closed-v2.webp", "cutout"],
  ["epfa/PCU EPFA Open.png", "epfa-open-v2.webp", "cutout"],
  ["epfa/PCU Entrance EPFA Open.png", "epfa-inlet-open-v2.webp", "cutout"],
  ["epfa/PCU EPFA Stacked Closed.png", "epfa-stacked-closed-v2.webp", "cutout"],
  ["epfa/PCU EPFA Stacked Open.png", "epfa-stacked-open-v2.webp", "cutout"],
  ["installations/PCU EPFA Installation Rooftop.jpg", "epfa-rooftop-installation-v2.webp", "field"],
  ["legacy-enviro-clean/PCU Enviro-Clean Air Scrubber.png", "enviro-clean-legacy-v2.webp", "cutout"],
];

async function processImage(relativeSource, outputName, kind) {
  const input = path.join(SOURCE, relativeSource);
  const output = path.join(OUTPUT, outputName);
  let pipeline = sharp(input, { failOn: "none" }).rotate();

  if (kind === "field") {
    pipeline = pipeline
      .modulate({ brightness: 1.035, saturation: 1.015 })
      .sharpen({ sigma: 0.65, m1: 0.6, m2: 1.2 })
      .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true });
  } else {
    pipeline = pipeline
      .modulate({ brightness: 1.025, saturation: 0.97 })
      .sharpen({ sigma: 0.55, m1: 0.5, m2: 1 })
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality: kind === "field" ? 86 : 89, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(output);

  const metadata = await sharp(output).metadata();
  const size = (await fs.stat(output)).size;
  console.log(`${outputName}: ${metadata.width}x${metadata.height}, ${(size / 1024).toFixed(0)} KB`);
}

await fs.mkdir(OUTPUT, { recursive: true });
for (const job of jobs) await processImage(...job);
