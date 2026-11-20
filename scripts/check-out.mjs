// Escanea out/**/*.html y out/**/*.txt (los payloads RSC llevan el mismo texto) con las frases, el origen y los secretos prohibidos de src/data/copy-guard.ts.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { FORBIDDEN_COPY, FORBIDDEN_ORIGIN, SECRET_PATTERNS } from "../src/data/copy-guard.ts";

const root = fileURLToPath(new URL("../out", import.meta.url));
const patterns = [...FORBIDDEN_COPY, ...FORBIDDEN_ORIGIN, ...SECRET_PATTERNS];

function* pageFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    // out/assets es el kit tal cual (sus páginas de demostración traen su propio texto de ejemplo, en inglés): no es
    // texto del sitio
    if (p === join(root, "assets")) continue;
    if (statSync(p).isDirectory()) yield* pageFiles(p);
    else if (name.endsWith(".html") || name.endsWith(".txt")) yield p;
  }
}

let files = 0, html = 0;
const hits = [];
for (const file of pageFiles(root)) {
  files++;
  if (file.endsWith(".html")) html++;
  const text = readFileSync(file, "utf8");
  for (const re of patterns) if (re.test(text)) hits.push(`${file.slice(root.length + 1)}: ${re}`);
}
if (html === 0) { console.error("out/ no tiene html: corré npm run build"); process.exit(1); }
for (const h of hits) console.error(h);
console.log(`${files} archivos, ${hits.length} coincidencias`);
process.exit(hits.length ? 1 : 0);
