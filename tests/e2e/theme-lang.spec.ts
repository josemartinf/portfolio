import { test, expect, type Page } from "@playwright/test";

/* El tema (claro u oscuro, el del sistema hasta que el visitante elige) y los dos idiomas (/ y /en). */
const bg = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
/** En el teléfono el botón vive en el menú: lo abre primero. */
async function themeButton(page: Page) {
  const toggle = page.locator(".nav__toggle");
  if (await toggle.isVisible()) await toggle.click();
  return page.locator("[data-theme-toggle]");
}

test.describe("tema", () => {
  test("sin elección sigue al sistema: oscuro con un sistema oscuro, claro con uno claro", async ({ browser, baseURL }) => {
    for (const [scheme, theme, color] of [["dark", "dark", "rgb(15, 15, 15)"], ["light", "light", "rgb(255, 255, 255)"]] as const) {
      const ctx = await browser.newContext({ baseURL, colorScheme: scheme });
      const page = await ctx.newPage();
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      expect(await bg(page)).toBe(color);
      await ctx.close();
    }
  });

  test("el botón cambia el tema, dice a cuál cambia y la elección queda para la próxima visita", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ baseURL, colorScheme: "dark" });
    const page = await ctx.newPage();
    await page.goto("/");
    const btn = await themeButton(page);
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAccessibleName("Cambiar a modo claro");
    await btn.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(btn).toHaveAccessibleName("Cambiar a modo oscuro");
    expect(await bg(page)).toBe("rgb(255, 255, 255)");
    expect(await page.locator('meta[name="theme-color"]').first().getAttribute("content")).toBe("#ffffff");
    // otra página del sitio, con el sistema todavía oscuro: manda la elección
    await page.goto("/en/envo");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await bg(page)).toBe("rgb(255, 255, 255)");
    await ctx.close();
  });
});

test.describe("idiomas", () => {
  test("la portada en inglés vive en /en, con su lang, y su link lleva a la española", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#proyectos-h")).toHaveText("Projects");
    const toggle = page.locator(".nav__toggle");
    if (await toggle.isVisible()) await toggle.click();
    await page.locator(".nav__lang").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("#proyectos-h")).toHaveText("Proyectos");
  });

  test("una página de caso lleva a la misma página en el otro idioma", async ({ page }) => {
    await page.goto("/club-zapateo");
    await expect(page.locator(".nav__lang")).toHaveAttribute("href", "/en/club-zapateo");
    await page.goto("/en/club-zapateo");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#pantallas-h")).toHaveText("Screens by role");
  });

  // el servidor local responde un 404 de texto a una dirección que no existe; Vercel sirve esta página (out/404.html)
  test("la página 404 tiene un link a la portada en inglés", async ({ page }) => {
    await page.goto("/404");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página no encontrada");
    await expect(page.locator("main a[href='/en']")).toBeVisible();
  });
});
