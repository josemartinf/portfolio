// The page is fully static: its only behaviour comes from the design kit's
// scripts in /assets. React hydration would fight the kit's DOM changes
// (React error #418), so after `next build` we drop Next's client runtime
// from every exported HTML file and keep plain HTML + CSS + kit scripts.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "out");

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) return e.name === "_next" || e.name === "assets" ? [] : htmlFiles(p);
      return e.name.endsWith(".html") ? [p] : [];
    }),
  );
  return files.flat();
}

export function stripNextRuntime(html) {
  return html
    .replace(/<script\b[^>]*\bsrc="\/_next\/[^"]*"[^>]*>\s*<\/script>/g, "")
    .replace(/<script\b[^>]*>\s*\(?self\.__next_[\s\S]*?<\/script>/g, "")
    .replace(/<link\b[^>]*\brel="preload"[^>]*\bas="script"[^>]*\/?>/g, "")
    .replace(/<link\b[^>]*\bas="script"[^>]*\brel="preload"[^>]*\/?>/g, "");
}

for (const file of await htmlFiles(outDir)) {
  const before = await readFile(file, "utf8");
  const after = stripNextRuntime(before);
  await writeFile(file, after);
  const left = (after.match(/\/_next\/static\/chunks\/[^"]+\.js/g) ?? []).length;
  console.log(`${path.relative(outDir, file)}: ${before.length - after.length} bytes removed, ${left} chunk refs left`);
}
