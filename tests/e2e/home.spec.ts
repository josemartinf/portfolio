import { test, expect } from "@playwright/test";

test("portfolio links, copy, and metadata", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sitios web y sistemas para negocios en Buenos Aires");
  await expect(page.locator('a[href^="https://wa.me/5491124078165"]').first()).toBeVisible();
  await expect(page.locator('a[href^="mailto:jmfmarin25@gmail.com"]').first()).toBeVisible();
  for (const link of await page.locator('a[target="_blank"]').all()) expect(await link.getAttribute("rel")).toContain("noopener");
  expect(await page.content()).not.toMatch(/origen-a|hotcuer|caracas vip/i);
  expect(await page.locator('meta[property="og:image"]').getAttribute("content")).toMatch(/^https:\/\//);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("hero contact fits on a phone", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await expect(page.locator(".hero").getByRole("link", { name: "Escribir por WhatsApp" })).toBeInViewport();
});

test("product cards include Stockie without a broken image", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#productos .project-card")).toHaveCount(2);
  await expect(page.locator("#productos .project-card--feature").filter({ hasText: "Stockie" }).locator("img")).toHaveCount(0);
});
