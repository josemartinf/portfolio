import { test, expect } from "@playwright/test";
import { FORBIDDEN_ORIGIN } from "../../src/data/copy-guard";

test("el h1 nombra a José Martin Flores y el rol actual no es QA", async ({ page }) => {
  await page.goto("/");
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toContainText("José Martin Flores");
  const hero = await page.locator(".hero").innerText();
  // QA solo como el origen, en "Desde" (revisión 2026-11-25); ni en el rol actual ni en ninguna otra parte de la entrada
  const metas = page.locator(".hero__metas dd");
  await expect(metas.nth(0)).not.toContainText(/\bQA\b/);
  await expect(metas.nth(2)).toContainText("2019 en QA");
  expect(hero.match(/\bQA\b/g)).toHaveLength(1);
  expect(hero).toMatch(/Software Engineer/);
  expect(await page.locator("body").innerText()).not.toMatch(/postulator/i);
});

test("tres links Ver el detalle, el primero lleva a /envo", async ({ page }) => {
  await page.goto("/");
  const links = page.getByRole("link", { name: /^Ver el detalle/ });
  await expect(links).toHaveCount(3);
  const hrefs = await links.evaluateAll((els) => els.map((el) => el.getAttribute("href")));
  expect(hrefs).toEqual(["/envo", "/stockie", "/club-zapateo"]);
  await links.first().click();
  await expect(page).toHaveURL(/\/envo$/);
});

test("los links de los sitios van a URLs https", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator("#proyectos .ptile a[target=_blank]").evaluateAll((els) => els.map((el) => el.getAttribute("href")));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) expect(href).toMatch(/^https:\/\//);
});

test("los links externos abren con noopener", async ({ page }) => {
  await page.goto("/");
  for (const link of await page.locator('a[target="_blank"]').all()) expect(await link.getAttribute("rel")).toContain("noopener");
});

/* Las regresiones de la portada anterior que siguen teniendo elemento (Task 7). El hero ya no lleva WhatsApp:
   su contacto es el email (botón secundario), y es ese el que tiene que verse en el teléfono. */
test("idioma, imagen para compartir, contactos y sin rastros del origen", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  expect(await page.locator('meta[property="og:image"]').getAttribute("content")).toMatch(/^https:\/\//);
  await expect(page.locator('a[href^="https://wa.me/5491124078165"]')).not.toHaveCount(0);
  await expect(page.locator('a[href^="mailto:contacto@joseflores.codes"]')).not.toHaveCount(0);
  const html = await page.content();
  for (const re of FORBIDDEN_ORIGIN) expect(html).not.toMatch(re);
});

test("el CV del hero entra en la pantalla del teléfono", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await expect(page.locator(".hero").getByRole("link", { name: /Descargar el CV/ })).toBeInViewport();
});

test("el email del cierre se lee escrito y se copia", async ({ page, context, browserName }, testInfo) => {
  await page.goto("/");
  const addr = page.locator("#contacto .email-copy__addr");
  await expect(addr).toHaveAttribute("href", /^mailto:/);
  const email = (await addr.innerText()).trim();
  expect(email).toMatch(/@/);
  const btn = page.locator("#contacto button[data-copy]");
  await expect(btn).toBeVisible();
  test.skip(browserName !== "chromium" || testInfo.project.name === "mobile", "permisos de portapapeles solo en Chromium de escritorio");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await btn.click();
  await expect(btn).toHaveText("Copiado");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(email);
});

test("robots.txt y sitemap.xml existen", async ({ request }) => {
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const map = await request.get("/sitemap.xml");
  expect(map.status()).toBe(200);
  expect(await map.text()).toContain("/club-zapateo");
});
