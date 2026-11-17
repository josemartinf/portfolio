// Servidor estático mínimo para ver y probar el export (out/) en local.
// Uso: node scripts/serve-out.mjs [puerto]   (por defecto 4173)
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.argv[2] ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png",
  ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain",
};

http.createServer(async (req, res) => {
  let pathname = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  const file = path.join(root, pathname);
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end("404");
  }
}).listen(port, "127.0.0.1", () => console.log(`out/ en http://127.0.0.1:${port}`));
