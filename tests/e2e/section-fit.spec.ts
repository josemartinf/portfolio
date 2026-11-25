import { test, expect } from "@playwright/test";

/* Revisión 2026-11-25: en una pantalla baja de escritorio la ficha técnica se montaba sobre Contacto, porque cada sección tenía
   un alto fijo de una pantalla. Nada de una sección termina por debajo de ella. */
for (const route of ["/envo", "/stockie", "/club-zapateo", "/en/envo", "/en/stockie", "/en/club-zapateo"]) {
  test(`${route}: nada se sale de su sección en 1280x720 ni en 1366x768`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "una pantalla baja de escritorio");
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const size of [{ width: 1280, height: 720 }, { width: 1366, height: 768 }]) {
      await page.setViewportSize(size);
      await page.goto(route);
      const out = await page.evaluate(() => [...document.querySelectorAll("main > section:not(.hero)")].flatMap((s) => {
        const end = s.getBoundingClientRect().bottom;
        return [...s.querySelectorAll("h2, h3, p, dt, dd, li, .bframe, .pframe")]
          .filter((e) => { const r = e.getBoundingClientRect(); return r.height > 0 && r.bottom > end + 1; })
          .map((e) => `${s.id}: ${(e.textContent!.trim() || e.className).slice(0, 40)}`);
      }));
      expect(out, `${size.width}x${size.height}`).toEqual([]);
    }
  });
}
