import http from "node:http";
import path from "node:path";
import { stat, readFile } from "node:fs/promises";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

const compress = promisify(gzip);

const root = path.resolve("dist");
const base = (process.env.VITE_BASE_PATH || "/").replace(/\/$/, "");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".json": "application/json",
};
http
  .createServer(async (request, response) => {
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      response.writeHead(400);
      response.end("Invalid URL");
      return;
    }
    if (base && pathname !== base && !pathname.startsWith(`${base}/`)) {
      response.writeHead(404);
      response.end("Outside configured base path");
      return;
    }
    let file = path.resolve(root, `.${pathname.slice(base.length) || "/"}`);
    if (file !== root && !file.startsWith(root + path.sep)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    let status = 200;
    try {
      const info = await stat(file);
      if (info.isDirectory()) {
        if (!pathname.endsWith("/")) {
          response.writeHead(301, { Location: `${pathname}/${url.search}` });
          response.end();
          return;
        }
        file = path.join(file, "index.html");
      }
      await stat(file);
    } catch {
      file = path.join(root, "404.html");
      status = 404;
    }
    try {
      const compressible = [
        ".html",
        ".css",
        ".js",
        ".svg",
        ".xml",
        ".json",
      ].includes(path.extname(file));
      const useGzip =
        compressible && request.headers["accept-encoding"]?.includes("gzip");
      const body = await readFile(file);
      response.writeHead(status, {
        "Content-Type": mime[path.extname(file)] || "application/octet-stream",
        "Cache-Control": "no-cache",
        ...(useGzip
          ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" }
          : {}),
      });
      response.end(useGzip ? await compress(body) : body);
    } catch {
      response.writeHead(500);
      response.end("Build the site before starting preview.");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(
      `Static preview: http://127.0.0.1:${port}${base}/ (no SPA rewrites)`,
    ),
  );
