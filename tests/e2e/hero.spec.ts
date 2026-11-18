import { test, expect } from "@playwright/test";

// La entrada del hero (assets/motion/motion.js) en un Chrome sin ventana queda quieta, como en una captura, salvo con
// <html data-motion="live">: el HTML de cada página llega con ese valor para que la entrada corra de verdad.
test.beforeEach(async ({ page }) => {
  await page.route(/127\.0\.0\.1:4173\/(envo|stockie|club-zapateo)?$/, async (route) => {
    const res = await route.fetch();
    await route.fulfill({ response: res, body: (await res.text()).replace('data-motion=""', 'data-motion="live"') });
  });
});

// Los renglones del h1 como texto sin espacios. Durante la entrada cada palabra va en una máscara .m-w (su caja no se
// mueve, la de adentro sube); después vuelven los nodos propios y se mide letra por letra.
const lines = (h1: HTMLElement) => {
  const out: string[] = [];
  let top: number | null = null;
  const push = (text: string, y: number) => { if (top === null || Math.abs(y - top) > 3) { out.push(""); top = y; } out[out.length - 1] += text.replace(/\s+/g, ""); };
  const masks = h1.querySelectorAll<HTMLElement>(".m-w");
  if (masks.length) masks.forEach((w) => push(w.textContent ?? "", w.getBoundingClientRect().top));
  else {
    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) for (let i = 0; i < (n.textContent ?? "").length; i++) {
      if (/\s/.test(n.textContent![i])) continue;
      const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1);
      push(n.textContent![i], r.getBoundingClientRect().top);
    }
  }
  return out;
};

for (const path of ["/", "/envo", "/stockie", "/club-zapateo"]) {
  test(`${path}: el h1 corta los renglones igual durante la entrada y al terminar (nada salta, ni la coma)`, async ({ page }) => {
    await page.goto(path, { waitUntil: "commit" });
    await page.waitForSelector(".hero.is-entering h1 .m-w", { state: "attached" });
    const during = await page.locator(".hero h1").evaluate(lines);
    await page.waitForSelector(".hero.is-entered", { state: "attached" });
    expect(await page.locator(".hero h1").evaluate(lines)).toEqual(during);
  });
}
