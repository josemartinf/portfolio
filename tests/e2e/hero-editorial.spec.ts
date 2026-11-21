import { test, expect } from "@playwright/test";

/* La entrada editorial (spec 2026-11-20-portada-editorial), en los bordes que los tests de unidad no ven: el inglés en
   las columnas angostas de la fila de datos, el nombre enorme en un ancho de tablet y el botón lleno en el modo claro. */

test("hero metas fit at 1024 in English", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/en");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const dd of await page.locator(".hero__metas dd").all()) expect(await dd.evaluate((e) => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
});

test("hero name fits at 700px", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 700, height: 900 });
  await page.goto("/");
  const box = await page.locator(".hero__name").boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(700);
  // cada renglón del nombre (con nowrap desde 640) cabe en la pantalla, no solo la caja del h1
  for (const line of await page.locator(".hero__line").all()) expect(await line.evaluate((e) => e.getBoundingClientRect().right <= innerWidth && e.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

// la frase y los botones nunca se montan sobre las letras del nombre (a 1024 la frase, más alta que el renglón de
// "Flores", subía hasta "Martin"); se mide la caja de las letras de cada renglón, no la del span (que es de bloque)
for (const width of [1024, 1280, 1440]) {
  test(`hero side never overlaps the name at ${width}`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/en"]) {
      await page.goto(path);
      const hit = await page.evaluate(() => {
        const side = document.querySelector(".hero__side")!.getBoundingClientRect();
        return [...document.querySelectorAll(".hero__line")].some((line) => {
          const r = document.createRange(); r.selectNodeContents(line);
          const t = r.getBoundingClientRect();
          return t.left < side.right && side.left < t.right && t.top < side.bottom && side.top < t.bottom;
        });
      });
      expect(hit, path).toBe(false);
    }
  });
}

test("primary button follows the theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator(".hero .btn--primary")).toHaveCSS("background-color", "rgb(15, 15, 15)");
});
