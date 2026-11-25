import { test, expect, type Page } from "@playwright/test";

/* El teléfono (2026-11-25): las capturas se leen y se abren enteras, todo se toca con el dedo, y nada de eso llega a
   escritorio. Los tests de la composición de escritorio están en los otros archivos. */

const routes = ["/", "/envo", "/stockie", "/club-zapateo", "/en", "/en/envo"];
const cases = ["/envo", "/stockie", "/club-zapateo"];
const onlyPhone = (name: string) => test.skip(name !== "mobile", "solo en un teléfono");

// nada se sale de costado en los anchos de teléfono de hoy, del más chico al más grande, ni acostado
for (const [width, height] of [[320, 568], [360, 740], [390, 844], [430, 932], [844, 390]]) {
  test(`sin desborde horizontal a ${width} px`, async ({ page }, info) => {
    onlyPhone(info.project.name);
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), route).toBe(0);
    }
  });
}

// todo lo que se toca responde en 44 px de alto, también los links dentro de un renglón (su área puede ser una capa
// sobre el texto: se prueba dónde cae el dedo, no la caja)
test("cada control se toca con el dedo", async ({ page }, info) => {
  onlyPhone(info.project.name);
  for (const route of routes) {
    await page.goto(route);
    await page.waitForTimeout(900);
    const low = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>("a[href], button, [role='button']")]
      .filter((e) => e.tabIndex >= 0 && !e.closest("[inert]") && !e.matches(".skip-link") && e.getBoundingClientRect().height > 0)
      .filter((e) => {
        e.scrollIntoView({ block: "center", inline: "center" });
        const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
        return [-21, 0, 21].some((dy) => !document.elementsFromPoint(x, y + dy).some((hit) => e === hit || e.contains(hit)));
      })
      .map((e) => (e.getAttribute("aria-label") ?? e.textContent ?? "").trim().slice(0, 40)));
    expect(low, route).toEqual([]);
  }
});

// dos links en renglones seguidos no se roban el toque: sobre el texto de un link responde ese link
for (const width of [320, 390]) {
  test(`cada link de estado responde sobre su propio texto a ${width} px`, async ({ page }, info) => {
    onlyPhone(info.project.name);
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      await page.goto(route);
      await page.waitForTimeout(900);
      const stolen = await page.locator(":is(.ptile__status, .case-hero__status) a").evaluateAll((links) => links.flatMap((a) => {
        a.scrollIntoView({ block: "center" });
        const r = a.getBoundingClientRect();
        return [3, r.height / 2, r.height - 3].filter((dy) => [4, r.width / 2, r.width - 4].some((dx) => {
          const hit = document.elementFromPoint(r.left + dx, r.top + dy);
          return hit !== a && !a.contains(hit);
        })).map((dy) => `${a.textContent} a ${Math.round(dy)} px`);
      }));
      expect(stolen, route).toEqual([]);
    }
  });
}

// un encuadre llena su ventana: la captura nunca deja una franja vacía a la derecha ni abajo
test("el encuadre de cada captura llena su ventana", async ({ page }, info) => {
  onlyPhone(info.project.name);
  for (const route of ["/", ...cases]) {
    await page.goto(route);
    const bad = await page.locator(".bframe--m").evaluateAll((frames) => frames.filter((f) => !(f as HTMLElement).hidden).flatMap((f) => {
      const v = f.querySelector(".bframe__view")!.getBoundingClientRect(), i = f.querySelector("img")!.getBoundingClientRect();
      return i.left <= v.left + 1 && i.top <= v.top + 1 && i.right >= v.right - 1 && i.bottom >= v.bottom - 1 ? [] : [f.querySelector("img")!.getAttribute("src")];
    }));
    expect(bad, route).toEqual([]);
  }
});

const firstRole = (page: Page) => page.locator(".case-role").first();

// la lista de pantallas es una fila de botones: el elegido se marca y la ventana cambia
test("tocar una pantalla cambia la ventana y marca la elegida", async ({ page }, info) => {
  onlyPhone(info.project.name);
  await page.goto("/envo");
  const chip = firstRole(page).getByRole("button", { name: "Zonas y recargos", exact: true });
  await chip.scrollIntoViewIfNeeded();
  await chip.tap();
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await expect(firstRole(page).locator(".bframe:visible")).toHaveCount(1);
  await expect(firstRole(page).locator(".bframe:visible img")).toHaveAttribute("src", /envo-zones/);
});

// la fila se corre sola para mostrar la elegida, y el botón vecino pasa bajo el puntero: no tiene que elegirse
test("con un mouse en una ventana angosta queda elegida la pantalla que se tocó", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/envo");
  for (const name of ["Caja de repartidores", "Zonas y recargos", "Inventario por ubicación"]) {
    const chip = firstRole(page).getByRole("button", { name, exact: true });
    await chip.click();
    await page.waitForTimeout(700);
    await expect(chip, name).toHaveAttribute("aria-pressed", "true");
  }
});

// un toque abre la captura entera, más ancha que la pantalla; al cerrar, el foco vuelve a la captura
for (const [route, open, close] of [["/envo", "Ampliar: ", "Cerrar la captura"], ["/en/envo", "Enlarge: ", "Close the screenshot"]]) {
  test(`una captura se abre entera y se cierra (${route})`, async ({ page }, info) => {
    onlyPhone(info.project.name);
    await page.goto(route);
    const btn = page.getByRole("button", { name: new RegExp(`^${open}`) }).first();
    await btn.scrollIntoViewIfNeeded();
    const name = await btn.getAttribute("aria-label");
    await btn.tap();
    const dialog = page.getByRole("dialog", { name: name!.replace(open, "") });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toHaveAttribute("src", /envo-panel\.webp$/);
    expect(await dialog.locator("img").evaluate((i) => i.getBoundingClientRect().width)).toBeGreaterThan(780);
    await dialog.getByRole("button", { name: close }).tap();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(btn).toBeFocused();
  });
}

// todo el bloque de un caso lleva al caso, y el link de su demo sigue siendo el suyo
test("el bloque de un caso es su link", async ({ page }, info) => {
  onlyPhone(info.project.name);
  await page.goto("/");
  const tile = page.locator('[data-project="envo"]');
  const at = (sel: string) => tile.locator(sel).first().evaluate((e) => {
    e.scrollIntoView({ block: "center" });
    const r = e.getBoundingClientRect();
    return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)?.closest("a")?.getAttribute("href");
  });
  expect(await at(".ptile__lead")).toBe("/envo");
  expect(await at(".ptile__status a")).toMatch(/^https:\/\/envo-demo\.tech/);
  await tile.locator(".ptile__lead").scrollIntoViewIfNeeded();
  const box = (await tile.locator(".ptile__lead").boundingBox())!;
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
  await expect(page).toHaveURL(/\/envo$/);
});

// en un teléfono acostado el nombre está en la primera pantalla
test("acostado, el nombre va primero", async ({ page }, info) => {
  onlyPhone(info.project.name);
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/");
  const name = await page.locator(".hero__name").evaluate((h) => h.getBoundingClientRect().bottom);
  expect(name).toBeLessThan(390);
});

// nada de esto llega a escritorio: ni el botón de ampliar, ni los encuadres
test("escritorio no cambia", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.goto("/envo");
  await expect(page.locator(".shot-zoom").first()).toBeHidden();
  await expect(page.locator(".case-role__list").first()).toHaveCSS("overflow-x", "visible");
  expect(await page.locator("#problema .bframe--m img").evaluate((i) => getComputedStyle(i).translate)).toBe("none");
});
