import { chromium, type Page } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { projectsBy } from "../src/data/projects";

const outputDir = path.resolve("public/projects");
const desktop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const mobile = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

async function dismissCookieBanner(page: Page) {
  const labels = [
    /rechazar (todas|cookies)/i,
    /reject all/i,
    /solo (las )?necesarias/i,
    /accept all/i,
    /aceptar (todas|cookies)/i,
  ];
  for (const label of labels) {
    const button = page.getByRole("button", { name: label }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 2000 }).catch(() => {});
      break;
    }
  }
}

async function capture(
  page: Page,
  url: string,
  fileName: string,
  targetWidth?: number,
) {
  const response = await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  if (!response || response.status() >= 400) {
    throw new Error(`${url} returned ${response?.status() ?? "no response"}`);
  }
  await page.waitForTimeout(3000);
  await dismissCookieBanner(page);
  await page.waitForTimeout(300);

  const png = await page.screenshot({ fullPage: false, animations: "disabled" });
  let image = sharp(png);
  if (targetWidth) image = image.resize({ width: targetWidth });
  const file = path.join(outputDir, fileName);
  const info = await image.webp({ quality: 80 }).toFile(file);
  console.log(`${file}: ${(info.size / 1024).toFixed(1)} KB`);
  if (info.size > 300 * 1024) {
    console.warn(`Review size: ${fileName} exceeds 300 KB at required quality 80.`);
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  // CAPTURE_RESOLVER_RULES: optional Chromium host-resolver-rules for networks that cannot reach a host IP.
  const rules = process.env.CAPTURE_RESOLVER_RULES;
  const browser = await chromium.launch(rules ? { args: [`--host-resolver-rules=${rules}`] } : {});
  try {
    for (const project of projectsBy("cliente")) {
      if (!project.liveUrl) throw new Error(`Missing liveUrl: ${project.slug}`);
      console.log(`Capturing ${project.name}: ${project.liveUrl}`);
      const desktopContext = await browser.newContext(desktop);
      try {
        await capture(await desktopContext.newPage(), project.liveUrl, `${project.slug}.webp`, 1600);
      } finally {
        await desktopContext.close();
      }
      const mobileContext = await browser.newContext(mobile);
      try {
        await capture(await mobileContext.newPage(), project.liveUrl, `${project.slug}-mobile.webp`);
      } finally {
        await mobileContext.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
