// Servidor estático mínimo para ver y probar el export (out/) en local.
// Uso: node scripts/serve-out.mjs [puerto]   (por defecto 4173)
// Como `cleanUrls` en Vercel: /envo sirve out/envo.html.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png",
  ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain",
};

const isFile = (file) => stat(file).then((s) => s.isFile(), () => false);

/**
 * El archivo de `root` que sirve `urlPath`, o null. `/` y las carpetas sirven su index.html; si `/x` no existe
 * y `x.html` sí, sirve ese. Nunca sale de `root`.
 */
export async function resolvePath(root, urlPath) {
  const base = path.resolve(root);
  let pathname;
  try { pathname = decodeURIComponent(new URL(urlPath, "http://localhost").pathname); } catch { return null; }
  if (pathname.endsWith("/")) pathname += "index.html";
  const file = path.join(base, pathname);
  if (file !== base && !file.startsWith(base + path.sep)) return null;
  if (await isFile(file)) return file;
  if (!path.extname(file) && (await isFile(`${file}.html`))) return `${file}.html`;
  return null;
}

function serve(root, port) {
  http.createServer(async (req, res) => {
    const file = await resolvePath(root, req.url ?? "/");
    if (!file) { res.writeHead(404, { "content-type": "text/plain" }).end("404"); return; }
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" }).end(body);
    } catch {
      res.writeHead(404, { "content-type": "text/plain" }).end("404");
    }
  }).listen(port, "127.0.0.1", () => console.log(`out/ en http://127.0.0.1:${port}`));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  serve(path.resolve("out"), Number(process.argv[2] ?? 4173));
}
