import { test, expect } from "@playwright/test";

const routes = ["/", "/envo", "/stockie", "/club-zapateo"];
const cases = routes.slice(1);

test.describe("sin desborde horizontal a 390 px", () => {
  for (const route of routes) {
    test(route, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "mobile");
      await page.goto(route);
      await page.waitForLoadState("load");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
    });
  }
});

test.describe("capturas y diagramas", () => {
  for (const route of cases) {
    test(route, async ({ page }) => {
      await page.goto(route);
      const imgs = page.locator("img");
      const n = await imgs.count();
      expect(n).toBeGreaterThan(0);
      for (let i = 0; i < n; i++) {
        const img = imgs.nth(i);
        // Las capturas de pestañas inactivas están ocultas a propósito (hidden): no hay a dónde hacer scroll, pero igual deben haber cargado.
        if (await img.isVisible()) await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0), { message: `img ${i}` }).toBe(true);
      }
      await expect(page.locator("[data-diagram] svg").first()).toBeAttached();
    });
  }
});

test.describe("reduced motion", () => {
  for (const route of cases) {
    test(route, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 1000 });
      await expect(page.locator("main img").first()).toBeVisible({ timeout: 1000 });
    });
  }
});

test("el caso Envo enlaza la demo por https", async ({ page }) => {
  await page.goto("/envo");
  await expect(page.locator('a[href="https://envo-demo.tech/demo"]').first()).toBeAttached();
});
