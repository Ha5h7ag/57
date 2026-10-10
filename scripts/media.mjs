import sharp from "sharp";
import { mkdir, stat, copyFile, readFile } from "node:fs/promises";
import path from "node:path";

await mkdir("public/media/generated", { recursive: true });
await mkdir("public/media/originals", { recursive: true });
const manifestPath = "src/content/media-sources.json";
const jobs = JSON.parse(await readFile(manifestPath, "utf8"));
const manifestStat = await stat(manifestPath);
const seen = new Set();
for (const job of jobs) {
  if (
    !/^[a-z0-9-]+$/.test(job.id) ||
    !/^[a-z0-9/-]+$/.test(job.source) ||
    seen.has(job.id)
  )
    throw new Error(`Invalid or duplicate media job ${job.id}`);
  seen.add(job.id);
  const source = `public/media/sources/${job.source}.png`;
  const target = `public/media/originals/${job.id}.webp`;
  const sourceStat = await stat(source);
  let targetStat;
  try {
    targetStat = await stat(target);
  } catch {
    /* First build. */
  }
  const modified = Math.max(sourceStat.mtimeMs, manifestStat.mtimeMs);
  if (!targetStat || modified > targetStat.mtimeMs) {
    let image = sharp(source);
    if (job.zoom) {
      const meta = await image.metadata();
      const width = Math.round(meta.width * 0.72),
        height = Math.round(meta.height * 0.72);
      image = image.extract({
        left: Math.round((meta.width - width) / 2),
        top: Math.round((meta.height - height) / 2),
        width,
        height,
      });
    }
    if (job.crop)
      image = image.resize(job.crop[0], job.crop[1], { fit: "cover" });
    if (job.mono) image = image.grayscale();
    await image.webp({ quality: 94 }).toFile(target);
  }
  for (const width of [480, 800, 1200, 1600]) {
    const file = `public/media/generated/${job.id}-${width}.webp`;
    let outputStat;
    try {
      outputStat = await stat(file);
    } catch {
      /* First build. */
    }
    if (!outputStat || modified > outputStat.mtimeMs)
      await sharp(target)
        .resize(width)
        .webp({ quality: width === 480 ? 78 : 86 })
        .toFile(file);
  }
  await sharp(target)
    .resize(1200, 630, { fit: "contain", background: "#f2f3ed" })
    .webp({ quality: 86 })
    .toFile(`public/media/generated/${job.id}-social.webp`);
}
// Self-hosted font packages include OFL licences; retain copies with the project.
await mkdir("public/licenses", { recursive: true });
for (const name of ["space-grotesk", "ibm-plex-mono"]) {
  await copyFile(
    path.join("node_modules", "@fontsource", name, "LICENSE"),
    `public/licenses/${name}.txt`,
  );
}
console.log(
  `Optimized ${jobs.length} demonstration images into responsive WebP variants.`,
);
