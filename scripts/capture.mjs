// Uso: node scripts/capture.mjs <envo|stockie|zapateo|rd550|sites> [vista ...]
// Capturas de instancias locales con datos demo. Nada de producción.
// Variables de entorno (solo los nombres; los valores no se escriben en el repo). Si falta alguna que la vista necesita, el script corta con un mensaje:
//   ENVO_TOTP_URI, ENVO_DEMO_PASSWORD (Envo, admin demo)
//   STOCKIE_ADMIN_EMAIL, STOCKIE_SELLER_EMAIL, STOCKIE_DEMO_PASSWORD (Stockie)
//   ZAPATEO_ADMIN_EMAIL, ZAPATEO_ADMIN_PASSWORD, ZAPATEO_STAFF_PIN (Club Zapateo)
// Envo: el secreto TOTP sale de la variable de entorno ENVO_TOTP_URI (nunca se escribe a disco).
// Con ENVO_BASE (la demo pública, p. ej. https://envo-demo.tech) se entra por `${ENVO_BASE}/demo`, que inicia
// sesión sola con datos demo; ahí el script solo navega y abre vistas, nunca confirma, guarda ni borra nada.
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { totp } from "./totp.mjs";

const OUT = path.resolve("public/projects");
const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const HIDE_DEV = "nextjs-portal, [data-nextjs-toast], [data-next-badge-root], #__next-build-watcher { display: none !important; }";

async function save(page, name, frame) {
  await mkdir(OUT, { recursive: true });
  await page.addStyleTag({ content: HIDE_DEV }).catch(() => {});
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur()).catch(() => {});
  await page.mouse.move(1420, 880);
  await page.waitForTimeout(800);
  const png = await page.screenshot({ type: "png" });
  if (frame === "phone") {
    await sharp(png).resize(780, 1688, { fit: "cover", position: "top" }).webp({ quality: 82 }).toFile(path.join(OUT, `${name}.webp`));
  } else {
    const big = sharp(png).resize(1600, 1000, { fit: "cover", position: "top" });
    await big.clone().webp({ quality: 82 }).toFile(path.join(OUT, `${name}.webp`));
    await big.clone().resize(800, 500).webp({ quality: 82 }).toFile(path.join(OUT, `${name}-800.webp`));
  }
  console.log("ok", name);
}

async function go(page, url, { settle = 1200, waitUntil = "load" } = {}) {
  await page.goto(url, { waitUntil, timeout: 90000 });
  await page.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});
  await page.waitForTimeout(settle);
}

async function withBrowser(opts, fn) {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await fn(page, ctx);
  } finally {
    await browser.close();
  }
}

const only = (views) => (name) => views.length === 0 || views.includes(name);

// ---------------------------------------------------------------- Envo
const ENVO = (process.env.ENVO_BASE ?? "http://localhost:3301").replace(/\/$/, "");
const ENVO_DEMO = Boolean(process.env.ENVO_BASE);

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta la variable de entorno ${name} (ver la lista al principio de scripts/capture.mjs)`);
  return v;
}

function envoSecret() {
  const uri = process.env.ENVO_TOTP_URI;
  if (!uri) throw new Error("Falta ENVO_TOTP_URI (otpauth del seed de demo_admin)");
  const secret = new URL(uri).searchParams.get("secret");
  if (!secret) throw new Error("ENVO_TOTP_URI no trae secret");
  return secret;
}

async function envoDemoLogin(page) {
  await go(page, `${ENVO}/demo`, { settle: 3000 });
  const ok = await page.waitForURL((u) => !u.pathname.startsWith("/demo") && !u.pathname.startsWith("/login"), { timeout: 30000, waitUntil: "commit" }).then(() => true, () => false);
  if (!ok) throw new Error(`La demo no inició sesión (quedó en ${page.url()})`);
  await page.waitForTimeout(2000);
}

async function envoLogin(page) {
  if (ENVO_DEMO) return envoDemoLogin(page);
  // Envo rechaza reusar un código dentro del mismo paso de 30 s: si falla, esperamos al siguiente y reintentamos.
  for (let attempt = 0; attempt < 2; attempt++) {
    await go(page, `${ENVO}/login`, { settle: 3000 });
    await page.fill('input[name="username"]', "demo_admin");
    await page.fill('input[name="password"]', need("ENVO_DEMO_PASSWORD"));
    await page.fill('input[name="totp"]', totp(envoSecret()));
    await page.getByRole("button", { name: "Ingresar" }).click();
    const ok = await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 12000, waitUntil: "commit" }).then(() => true, () => false);
    if (ok) return;
    await page.waitForTimeout(31000 - (Date.now() % 30000));
  }
  throw new Error("No se pudo iniciar sesión en Envo");
}

const ENVO_VIEWS = {
  "envo-panel": { route: "/admin" },
  "envo-orders": {
    route: "/admin/orders",
    prep: async (page) => {
      await page.getByRole("button", { name: /Comprobantes por revisar/ }).click();
      await page.waitForTimeout(1200);
      // El pedido DEMO-0001 es la transferencia con comprobante.
      const row = page.locator("article, li, div").filter({ hasText: "DEMO-0001" }).filter({ has: page.getByRole("button", { name: /Revisar comprobante/ }) }).last();
      await row.getByRole("button", { name: /Revisar comprobante/ }).click();
      await page.waitForTimeout(3500);
    },
  },
  "envo-cash": {
    route: "/admin/cash",
    prep: async (page) => {
      await page.getByText("Pago semanal de delivery").first().click();
      await page.waitForTimeout(2500);
    },
  },
  "envo-reports": {
    route: "/admin/reports",
    prep: async (page) => {
      await page.getByText("Dinero", { exact: true }).first().click();
      await page.waitForTimeout(2500);
    },
  },
  "envo-zones": {
    route: "/admin/zones",
    prep: async (page) => {
      await page.getByText("Recargos de delivery").first().click();
      await page.waitForTimeout(1200);
      await page.setViewportSize({ width: 1900, height: 1188 });
      await page.waitForTimeout(1000);
    },
  },
  "envo-inventory": { route: "/admin/inventory" },
  "envo-alerts": { route: "/admin/alerts" },
  "envo-staff-permissions": {
    route: "/admin/staff/permisos",
    prep: async (page) => {
      const select = page.locator("select").first();
      const options = await select.locator("option").allTextContents();
      const pick = options.find((o) => /operador/i.test(o) && !/Eleg/i.test(o)) ?? options[1];
      await select.selectOption({ label: pick });
      await page.waitForTimeout(2500);
    },
  },
};

async function envo(views) {
  const want = only(views);
  await withBrowser(DESKTOP, async (page) => {
    await envoLogin(page);
    for (const [name, v] of Object.entries(ENVO_VIEWS)) {
      if (!want(name)) continue;
      await go(page, ENVO + v.route);
      if (v.prep) await v.prep(page);
      await save(page, name, "browser");
      await page.setViewportSize(DESKTOP.viewport);
    }
  });
}

// ---------------------------------------------------------------- Stockie
const STOCKIE = "http://localhost:3201";

async function stockieLogin(page, email, password) {
  await go(page, `${STOCKIE}/login`, { settle: 2000 });
  await page.fill("input[type=email], input[name=email]", email);
  await page.fill("input[type=password]", password);
  await Promise.all([page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 60000, waitUntil: "commit" }), page.click("button[type=submit]")]);
  await page.waitForTimeout(2000);
}

const STOCKIE_ADMIN = {
  "stockie-dashboard": { route: "/dashboard" },
  "stockie-sale": {
    route: "/ventas/nueva",
    prep: async (page) => {
      const search = page.locator('input[placeholder^="Buscar por nombre"]');
      for (const [term, name] of [["Lubricante", "multiuso 250 ml"]]) {
        await search.fill(term);
        await page.waitForTimeout(1800);
        await page.getByText(name).first().click();
        await page.waitForTimeout(800);
      }
      // Pago mixto: dólares en efectivo más bolívares por Pago Móvil.
      await page.getByRole("button", { name: /Agregar pago/ }).click();
      await page.waitForTimeout(600);
      const methods = page.locator("select").filter({ hasText: "Efectivo USD" });
      await methods.nth(1).selectOption("PAGO_MOVIL");
      const amounts = page.locator('input[placeholder="0.00"]');
      await amounts.nth(-2).fill("20");
      await amounts.nth(-1).fill("20800");
      await page.waitForTimeout(800);
    },
  },
  "stockie-fiscal": { route: "/stock/fiscal" },
  "stockie-reports": { route: "/dashboard/reportes" },
  "stockie-credits": { route: "/dashboard/creditos" },
  "stockie-suppliers": {
    route: "/dashboard/proveedores",
    prep: async (page) => {
      await page.getByText("Deudas", { exact: true }).click();
      await page.waitForTimeout(2000);
    },
  },
  "stockie-intake": {
    route: "/deposito/ingreso",
    prep: async (page) => {
      await page.getByText("Seleccionar proveedor").first().click();
      await page.waitForTimeout(600);
      await page.getByText("Tornillería del Sur (demo)").first().click();
      await page.waitForTimeout(600);
      await page.locator("select").first().selectOption({ index: 1 });
      await page.fill('input[placeholder="FAC-001"]', "FAC-0042");
      await page.fill('input[placeholder^="Buscar producto, SKU"]', "Arandela plana M8");
      await page.waitForTimeout(1800);
      await page.getByText("STK-0006").first().click();
      await page.waitForTimeout(800);
      const numbers = page.locator('input[placeholder="0"], input[placeholder="0.00"]');
      await numbers.nth(0).fill("120");
      await numbers.nth(1).fill("0.35");
      await numbers.nth(2).fill("0.60");
      await numbers.nth(3).fill("0.55");
      await page.evaluate(() => { window.scrollTo(0, 0); document.querySelectorAll("main, [class*=overflow]").forEach((el) => { el.scrollTop = 0; }); });
      await page.waitForTimeout(1500);
    },
  },
};
const STOCKIE_SELLER = { "stockie-seller-dashboard": { route: "/vendedor/dashboard" } };

async function stockieRun(views, account, set) {
  const want = only(views);
  if (!Object.keys(set).some(want)) return;
  await withBrowser(DESKTOP, async (page) => {
    await stockieLogin(page, account.email, account.password);
    for (const [name, v] of Object.entries(set)) {
      if (!want(name)) continue;
      await go(page, STOCKIE + v.route, { settle: 2500 });
      if (v.prep) await v.prep(page);
      await save(page, name, "browser");
    }
  });
}

async function stockie(views) {
  await stockieRun(views, { email: need("STOCKIE_ADMIN_EMAIL"), password: need("STOCKIE_DEMO_PASSWORD") }, STOCKIE_ADMIN);
  await stockieRun(views, { email: need("STOCKIE_SELLER_EMAIL"), password: need("STOCKIE_DEMO_PASSWORD") }, STOCKIE_SELLER);
}

// ---------------------------------------------------------------- Club Zapateo
// Instancia local: el admin vive en el host `localhost` (ADMIN_HOSTNAME) y el sitio público en 127.0.0.1.
const ZAP_ADMIN = "http://localhost:3202";
const ZAP_PUBLIC = "http://127.0.0.1:3202";

const ZAP_ADMIN_VIEWS = {
  "club-zapateo-admin-dashboard": { tab: "DASHBOARD" },
  "club-zapateo-admin-events": {
    tab: "EVENTOS",
    // Se abre un evento para editarlo: muestra su afiche y los datos cargados.
    prep: async (page) => {
      await page.getByRole("button", { name: /^editar$/i }).first().click();
      await page.setViewportSize({ width: 1900, height: 1188 });
      await page.waitForTimeout(2000);
    },
  },
  "club-zapateo-admin-reconciliation": {
    tab: "CONCILIACIÓN",
    prep: async (page) => {
      await page.getByRole("button", { name: /dry run/i }).click();
      await page.waitForTimeout(3500);
    },
  },
};

async function zapateo(views) {
  await zapateoPublic(views);
  const want = only(views);
  if (Object.keys(ZAP_ADMIN_VIEWS).some(want)) {
    await withBrowser(DESKTOP, async (page) => {
      await go(page, `${ZAP_ADMIN}/`, { settle: 2500 });
      await page.fill("input[type=email]", need("ZAPATEO_ADMIN_EMAIL"));
      await page.fill("input[type=password]", need("ZAPATEO_ADMIN_PASSWORD"));
      await page.click("button[type=submit]");
      await page.waitForTimeout(5000);
      for (const [name, v] of Object.entries(ZAP_ADMIN_VIEWS)) {
        if (!want(name)) continue;
        await page.getByRole("button", { name: new RegExp(`^${v.tab}$`, "i") }).click();
        await page.waitForTimeout(2500);
        if (v.prep) await v.prep(page);
        await save(page, name, "browser");
        await page.setViewportSize(DESKTOP.viewport);
      }
    });
  }
}

async function zapateoPublic(views) {
  const want = only(views);
  if (want("club-zapateo-home")) {
    await withBrowser(DESKTOP, async (page) => {
      await go(page, `${ZAP_PUBLIC}/`, { settle: 6000 });
      await page.getByRole("link", { name: /^eventos$/i }).first().click();
      await page.waitForTimeout(3000);
      // Las tres fechas a la venta a la vista, con una ventana más alta para que entren completas.
      await page.setViewportSize({ width: 1800, height: 1125 });
      await page.waitForTimeout(1500);
      const first = await page.getByText(/noche-electrica/i).first().boundingBox();
      if (first) await page.evaluate((y) => window.scrollBy(0, y), first.y - 150);
      await page.waitForTimeout(3000);
      await save(page, "club-zapateo-home", "browser");
    });
  }
  if (want("club-zapateo-staff-phone")) {
    await withBrowser(PHONE, async (page) => {
      await go(page, `${ZAP_PUBLIC}/staff`, { settle: 3000 });
      await page.locator("input").first().fill(need("ZAPATEO_STAFF_PIN"));
      await page.locator("button[type=submit], button").first().click();
      await page.waitForTimeout(3500);
      // Una entrada válida tipeada a mano para mostrar el resultado del control (código de prueba por entorno).
      if (process.env.ZAP_TICKET_CODE) {
        await page.locator('input[placeholder^="CZ-"]').fill(process.env.ZAP_TICKET_CODE);
        await page.getByRole("button", { name: /validar/i }).click();
        await page.waitForTimeout(3500);
      }
      await save(page, "club-zapateo-staff-phone", "phone");
    });
  }
}

// ---------------------------------------------------------------- Sitios públicos en vivo (solo páginas públicas, sin logins)
const SITES = {
  "moodi-home": "https://www.moodi-home.store",
  "aether-aerospace-care": "https://aether-aerospace.com",
  "repuestos-globalfia": "https://www.globalfia.store",
};

async function dismissBanners(page) {
  for (const label of [/rechazar/i, /reject all/i, /solo (las )?necesarias/i, /aceptar/i, /accept/i, /entendido/i]) {
    const button = page.getByRole("button", { name: label }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 2000 }).catch(() => {});
      break;
    }
  }
}

async function sites(views) {
  const want = only(views);
  await withBrowser(DESKTOP, async (page) => {
    for (const [name, url] of Object.entries(SITES)) {
      if (!want(name)) continue;
      await go(page, url, { settle: 7000, waitUntil: "domcontentloaded" });
      await dismissBanners(page);
      await page.waitForTimeout(1500);
      await save(page, name, "browser");
    }
  });
}

// ---------------------------------------------------------------- Driver SS-550 (panel local sin dispositivo)
async function rd550(views) {
  if (!only(views)("rd550-panel")) return;
  await withBrowser(DESKTOP, async (page) => {
    await go(page, "http://localhost:3000/", { settle: 3000 });
    // La biblioteca se filtra: lista de acciones genéricas y nada de los atajos del Mac de quien lo corre.
    await page.getByPlaceholder("Buscar").first().fill("Page");
    await page.waitForTimeout(800);
    await page.mouse.click(580, 256);
    await page.waitForTimeout(1500);
    await save(page, "rd550-panel", "browser");
  });
}

// Mini App del repartidor: Telegram verifica la identidad con un gateway que no existe en local.
// La sesión de un rider demo se crea fuera de este script y llega por ENVO_RIDER_SESSION (cookie envo_session).
async function envoPhone() {
  const session = process.env.ENVO_RIDER_SESSION;
  if (!session) throw new Error("Falta ENVO_RIDER_SESSION (sesión de un rider demo)");
  await withBrowser(PHONE, async (page, ctx) => {
    await ctx.addCookies([{ name: "envo_session", value: session, url: ENVO }]);
    await go(page, `${ENVO}/rider`, { settle: 3500 });
    await save(page, "envo-courier-phone", "phone");
  });
}

const targets = { sites, rd550, zapateo, stockie, envo: (views) => (views[0] === "envo-courier-phone" ? envoPhone() : envo(views)) };
const [target, ...views] = process.argv.slice(2);
if (!targets[target]) {
  console.error("Uso: node scripts/capture.mjs <envo|stockie|zapateo|rd550|sites> [vista ...]");
  process.exit(1);
}
await targets[target](views);
