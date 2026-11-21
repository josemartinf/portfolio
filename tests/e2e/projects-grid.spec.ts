import { test, expect } from "@playwright/test";

/* La grilla de proyectos (spec 2026-11-20-portada-editorial), en lo que los tests de unidad no ven: el texto de un
   bloque nunca va encima de su captura, y con movimiento reducido el hover no mueve nada. */

test("tile text never sits on its capture", async ({ page }) => {
  await page.goto("/");
  for (const tile of await page.locator("#proyectos .ptile").all()) {
    const media = tile.locator(".ptile__media");
    if (!(await media.count())) continue;
    const m = await media.boundingBox(), h = await tile.locator(".ptile__body h3").boundingBox();
    expect(h!.y).toBeGreaterThanOrEqual(m!.y + m!.height - 1);
  }
});

test("tile hover is still with reduced motion", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const tile = page.locator("#proyectos .ptile").first();
  await tile.hover();
  await expect(tile.locator(".bframe").first()).toHaveCSS("transform", "none");
});

// los encabezados de sección con la línea editorial (como "Proyectos"), en la portada y en los casos; el statement con
// su línea arriba, al ancho del contenido
test("section heads carry the editorial rule", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  for (const [path, sel] of [["/", "#experiencia .section-head"], ["/", "#stack .section-head"], ["/envo", "#problema .section-head"], ["/", "#como-trabajo > .wrap"]] as const) {
    await page.goto(path);
    const el = page.locator(sel).first();
    const prop = sel.startsWith("#como-trabajo") ? "border-top-width" : "border-bottom-width";
    await expect(el, `${path} ${sel}`).toHaveCSS(prop, "1px");
  }
});
