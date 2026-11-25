// Después de `next build`: saca de out/assets lo que el kit de diseño trae para trabajar y el sitio nunca pide (las páginas
// de demostración, los laboratorios y los momentos que no se repartieron). Si no, quedan publicadas e indexables.
import { readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Los momentos del sitio (RootShell y HomePage). */
export const MOMENTS = ["liquid-type", "iris-opens", "counter-rolls", "pinned-chapters"];

/** true si un archivo de out/assets (ruta con "/", relativa a assets) no tiene que publicarse. */
export function isKitExtra(rel) {
  const parts = rel.split("/");
  if (/\.(html|mjs|md)$/.test(rel)) return true;
  if (parts.some((p) => p === "_demo" || p === "_lab")) return true;
  return parts[0] === "moments" && parts.length > 2 && !MOMENTS.includes(parts[1]);
}

async function prune(root) {
  const all = await readdir(root, { recursive: true, withFileTypes: true });
  let n = 0;
  for (const e of all) {
    if (!e.isFile()) continue;
    const file = path.join(e.parentPath, e.name);
    if (!isKitExtra(path.relative(root, file).split(path.sep).join("/"))) continue;
    await rm(file);
    n++;
  }
  console.log(`kit: ${n} archivos de trabajo fuera de ${path.relative(process.cwd(), root)}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await prune(path.resolve("out/assets"));
