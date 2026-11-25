// Genera public/og.jpg y public/og-en.jpg (la imagen al compartir un link) desde la entrada de la portada ya construida, así
// nunca queda la de un diseño anterior. Correr después de `npm run build` cuando cambie la entrada: `npm run og`, con
// `node scripts/serve-out.mjs` en otra terminal.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const BASE = process.env.OG_BASE ?? "http://127.0.0.1:4173";
const browser = await chromium.launch();
for (const [route, file] of [["/", "og.jpg"], ["/en", "og-en.jpg"]] as const) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // solo el nombre, la frase y la fila de datos: sin la barra ni los botones, que en una imagen no se pueden tocar
  await page.addStyleTag({ content: ".nav, .hero .btn-row, .hero__links, .hero__metas > div:last-child, .hero__band { display: none !important } .hero--editorial { padding-block: 40px !important; min-height: 630px !important }" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: fileURLToPath(new URL(`../public/${file}`, import.meta.url)), type: "jpeg", quality: 88 });
  await page.close();
  console.log(file);
}
await browser.close();
