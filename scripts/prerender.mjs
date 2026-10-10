import { readFile, writeFile, mkdir, access, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const serverEntry = await import(
  pathToFileURL(path.resolve(".prerender/entry-server.js")).href
);
const { publicRoutes, validateContent, render, seoHtml, media, canonicalUrl } =
  serverEntry;
const errors = validateContent();
for (const image of Object.values(media)) {
  for (const file of [`${image.src}-800.webp`, image.original]) {
    try {
      await access(path.join("public", file));
    } catch {
      errors.push(`Missing media: ${file}`);
    }
  }
}
if (errors.length)
  throw new Error(`Content validation failed:\n${errors.join("\n")}`);
const template = (await readFile("dist/index.html", "utf8")).replace(
  /<title>.*?<\/title>/,
  "",
);
for (const route of [...publicRoutes(), "/404.html"]) {
  const notFound = route === "/404.html";
  const target = notFound
    ? "dist/404.html"
    : path.join("dist", route.slice(1), "index.html");
  const html = template
    .replace("<!--page-head-->", seoHtml(notFound ? "/not-found/" : route))
    .replace(
      '<div id="root">',
      `<div id="root" data-prerendered="${notFound ? "false" : "true"}">`,
    )
    .replace("<!--app-html-->", render(notFound ? "/not-found/" : route));
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes()
  .map((route) => `<url><loc>${canonicalUrl(route)}</loc></url>`)
  .join("")}</urlset>`;
await writeFile("dist/sitemap.xml", sitemap);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${canonicalUrl("sitemap.xml")}\n`,
);
await writeFile("dist/.nojekyll", "");
// Only optimized images and on-demand originals belong in the deployment artifact.
const sources = path.resolve("dist/media/sources");
const distRoot = path.resolve("dist") + path.sep;
if (!sources.startsWith(distRoot))
  throw new Error("Source cleanup must remain inside dist.");
await rm(sources, { recursive: true, force: true });
console.log(
  `Prerendered ${publicRoutes().length} public routes, plus the custom 404.`,
);
