import { test, expect } from "@playwright/test";

/* La entrada editorial (spec 2026-11-20-portada-editorial), en los bordes que los tests de unidad no ven: el inglés en
   las columnas angostas de la fila de datos, el nombre enorme en un ancho de tablet y el botón lleno en el modo claro. */

// el kit recorta el hero (overflow-x: clip en .hero--editorial), así que un desborde adentro nunca llega al
// scrollWidth del documento: se mide el texto mismo (Range) contra su columna y contra el borde del contenido
test("hero metas fit at 1024 in English", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/en");
  const out = await page.evaluate(() => {
    const wrap = document.querySelector(".hero__grid")!.getBoundingClientRect();
    return [...document.querySelectorAll(".hero__metas > div")].flatMap((col) => {
      const c = col.getBoundingClientRect();
      return [...col.querySelectorAll("dt, dd")].filter((el) => {
        const r = document.createRange(); r.selectNodeContents(el);
        const t = r.getBoundingClientRect();
        return t.right > c.right + 1 || t.right > wrap.right + 1;
      }).map((el) => el.textContent);
    });
  });
  expect(out).toEqual([]);
});

// cada renglón del nombre (nowrap desde 640) entra en el contenido: se mide el texto (Range), no la caja del span,
// que es de bloque y siempre mide lo que el contenido
for (const width of [640, 700, 800, 1023]) {
  test(`hero name fits at ${width}px`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/en"]) {
      await page.goto(path);
      const out = await page.evaluate(() => {
        const wrap = document.querySelector(".hero__grid")!.getBoundingClientRect();
        return [...document.querySelectorAll(".hero__line")].filter((line) => {
          const r = document.createRange(); r.selectNodeContents(line);
          const t = r.getBoundingClientRect();
          return t.left < wrap.left - 1 || t.right > wrap.right + 1;
        }).map((l) => l.textContent);
      });
      expect(out, path).toEqual([]);
    }
  });
}

// la frase y los botones nunca se montan sobre las letras del nombre (a 1024 la frase, más alta que el renglón de
// "Flores", subía hasta "Martin"). Las letras de cada renglón: a lo ancho, lo que ocupa el texto (el span es de
// bloque, corre todo el ancho); a lo alto, la caja del renglón (interlineado .84, la altura de las letras; el área de
// contenido del texto baja ~0,2em más, el lugar de los descendentes, que el nombre no tiene salvo la J de la izquierda)
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
          const x = r.getBoundingClientRect(), y = line.getBoundingClientRect();
          return x.left < side.right && side.left < x.right && y.top < side.bottom && side.top < y.bottom;
        });
      });
      expect(hit, path).toBe(false);
    }
  });
}

// la captura de Envo asoma al pie de la primera pantalla de una laptop (el rótulo y la barra de la ventana, por lo
// menos): a 1024x768 la frase y los botones apilados bajo el nombre la empujaban 38 px debajo del pie
for (const [width, height] of [[1024, 768], [1280, 800], [1440, 900]]) {
  test(`the Envo band peeks above the fold at ${width}x${height}`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.setViewportSize({ width, height });
    for (const path of ["/", "/en"]) {
      await page.goto(path);
      const top = await page.locator(".hero__band").evaluate((e) => e.getBoundingClientRect().top);
      expect(top, path).toBeLessThanOrEqual(height - 60);
    }
  });
}

// en una pantalla alta (un monitor grande, un iPad Pro parado) la entrada no abre un pozo entre la fila de datos y
// el nombre: la parte de arriba crece hasta un tope, y la captura asoma más
for (const [width, height] of [[1024, 1366], [1920, 1200], [2560, 1440]]) {
  test(`hero keeps the name near the facts at ${width}x${height}`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.setViewportSize({ width, height });
    await page.goto("/");
    const gap = await page.evaluate(() => document.querySelector(".hero__line")!.getBoundingClientRect().top - document.querySelector(".hero__metas")!.getBoundingClientRect().bottom);
    expect(gap).toBeLessThanOrEqual(260);
    const top = await page.locator(".hero__band").evaluate((e) => e.getBoundingClientRect().top);
    expect(top).toBeLessThanOrEqual(height - 60);
  });
}

// los links de "Escribime" se llaman por su nombre: el "·" que los separa es de dibujo, no de lectura
test("hero contact links are named without their separators", async ({ page }) => {
  await page.goto("/");
  const links = page.locator(".hero__links a");
  await expect(links.nth(0)).toHaveAccessibleName("Email");
  await expect(links.nth(1)).toHaveAccessibleName("LinkedIn");
  await expect(links.nth(2)).toHaveAccessibleName("GitHub");
});

// la bajada del hero de un caso lleva el paso de lectura de la rampa de texto (no el blanco del título)
test("case hero lead keeps the read step", async ({ page }) => {
  for (const scheme of ["dark", "light"] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/envo");
    const [lead, lede, h1] = await page.evaluate(() => [".case-hero .hero__lead", ".case-lede", ".case-hero h1"].map((s) => getComputedStyle(document.querySelector(s)!).color));
    expect(lead, scheme).toBe(lede);
    expect(lead, scheme).not.toBe(h1);
  }
});

test("primary button follows the theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator(".hero .btn--primary")).toHaveCSS("background-color", "rgb(15, 15, 15)");
});
