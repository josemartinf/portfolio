import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { caseBySlug, cases } from "@/data/cases";
import { sites } from "@/data/sites";
import { tools } from "@/data/tools";
import { certifications, education, jobs, stackIcons } from "@/data/profile";
import { allCopy, FORBIDDEN_COPY, FORBIDDEN_ORIGIN, SECRET_PATTERNS } from "@/data/copy-guard";
import { site } from "@/lib/site";

describe("content", () => {
  it("cases are the three approved, in order", () => expect(cases.map((c) => c.slug)).toEqual(["envo", "stockie", "club-zapateo"]));

  it("no forbidden sales/job-hunt copy", () => FORBIDDEN_COPY.forEach((r) => expect(allCopy()).not.toMatch(r)));

  it("no origin or secret strings", () => [...FORBIDDEN_ORIGIN, ...SECRET_PATTERNS].forEach((r) => expect(allCopy()).not.toMatch(r)));

  it("postulator and trading bot are gone", () => expect(allCopy()).not.toMatch(/postulator|freqtrade|trading/i));

  it("current job is Software Engineer at Naranja X", () => {
    expect(jobs[0]).toMatchObject({ company: "Naranja X", to: null });
    expect(jobs[0].role).toMatch(/Software Engineer/);
    expect(site.role).not.toMatch(/\bQA\b/);
  });

  it("every case has a full tech sheet and 4-6 decisions", () =>
    cases.forEach((c) => {
      expect(c.decisions.length).toBeGreaterThanOrEqual(4);
      expect(c.decisions.length).toBeLessThanOrEqual(6);
      expect(c.sheet.stack.length).toBeGreaterThan(2);
      expect(c.sheet.practices.length).toBeGreaterThan(0);
      expect(c.diagram.nodes.length).toBeLessThanOrEqual(7);
    }));

  it("every case and site has its parts and status (checklist de Web Reactiva)", () =>
    [...cases, ...sites].forEach((p) => {
      expect(p.parts.length).toBeGreaterThan(0);
      p.parts.forEach((part) => expect(part.trim().length).toBeGreaterThan(0));
      expect(p.status.trim().length).toBeGreaterThan(0);
      expect(Array.isArray(p.focus)).toBe(true);
    }));

  it("envo states its public demo and links /demo, never /admin or /login", () => {
    const envo = caseBySlug("envo");
    expect(envo.status).toBe("Demo en línea en envo-demo.tech");
    expect(envo.liveUrl).toBe("https://envo-demo.tech/demo");
    expect(JSON.stringify(cases)).not.toMatch(/envo-demo\.tech\/(admin|login)/);
  });

  it("stockie keeps its real use and links its public demo, never /admin or /login", () => {
    const stockie = caseBySlug("stockie");
    expect(stockie.status).toBe("En uso en MonJeep y GlobalFia · demo en stockie.envo-demo.tech");
    expect(stockie.liveUrl).toBe("https://stockie.envo-demo.tech/demo");
    expect(stockie.demoUrl).toBe("https://stockie.envo-demo.tech/demo");
    expect(JSON.stringify(cases)).not.toMatch(/stockie\.envo-demo\.tech\/(admin|login|dashboard)/);
  });

  it("every focus point names its topic first and every site status reads neutrally", () => {
    [...cases, ...sites].forEach((p) => p.focus.forEach((f) => expect(f.split(":")[0].trim().length).toBeGreaterThan(0)));
    sites.forEach((s) => expect(s.status).toMatch(/^En línea: /));
  });

  it("site.education is gone (profile.education is the one source)", () => expect(site).not.toHaveProperty("education"));

  it("stockie mentions multi-currency with BCV", () => expect(JSON.stringify(caseBySlug("stockie"))).toMatch(/BCV/));

  it("club zapateo covers admin and door", () => {
    const z = caseBySlug("club-zapateo");
    expect(z.roles.map((r) => r.role).join(" ")).toMatch(/Administraci/);
    expect(z.roles.some((r) => r.shots.some((s) => s.frame === "phone"))).toBe(true);
  });

  it("sites link to https live URLs; repuestos links to the stockie case", () => {
    sites.forEach((s) => expect(s.liveUrl).toMatch(/^https:\/\//));
    expect(sites.find((s) => s.slug === "repuestos")!.relatedCase).toBe("stockie");
  });

  it("sites are repuestos, moodi-home and aether; the only tool is the driver", () => {
    expect(sites.map((s) => s.slug)).toEqual(["repuestos", "moodi-home", "aether-aerospace-care"]);
    expect(tools.map((t) => t.slug)).toEqual(["rd550-mac"]);
  });

  it("envo keeps its panel as the hero shot", () => expect(caseBySlug("envo").heroShot.src).toBe("/projects/envo-panel.webp"));

  it("every shot points to /projects/<slug>-<view>.webp with alt and title", () => {
    const shots = [
      ...cases.flatMap((c) => [c.heroShot, ...c.roles.flatMap((r) => r.shots)]),
      ...sites.map((s) => s.shot),
      ...tools.flatMap((t) => (t.shot ? [t.shot] : [])),
    ];
    shots.forEach((s) => {
      expect(s.src).toMatch(/^\/projects\/[a-z0-9-]+\.webp$/);
      expect(s.alt.length).toBeGreaterThan(10);
      expect(s.title.length).toBeGreaterThan(0);
    });
  });

  it("profile has the full timeline, education, certifications and real stack icons", () => {
    expect(jobs.map((j) => j.company)).toEqual(["Naranja X", "Naranja X", "Ualá", "ECOSISTEMAS", "SIAHO.net"]);
    expect(JSON.stringify(education)).toMatch(/UGMA/);
    expect(certifications).toHaveLength(2);
    expect(stackIcons.length).toBeGreaterThanOrEqual(10);
    stackIcons.forEach((i) => expect(i.icon).toMatch(/^\/assets\/icons\/[a-z0-9-]+\.svg$/));
  });

  it("envo and stockie tell every layer of the spec", () => {
    const envoCopy = JSON.stringify({ ...caseBySlug("envo"), sheet: undefined });
    ["12 módulos", "23 pantallas", "referidos", "productos", "ventanas de entrega", "cuentas de pago", "DolarApi con reglas de vigencia", "ayuda y soporte"].forEach((f) => expect(envoCopy).toContain(f));
    const stockie = caseBySlug("stockie");
    const stockieCopy = JSON.stringify(stockie);
    // las cifras de Stockie van como fila de counter-rolls en su ficha
    expect(stockie.figures?.items.map((f) => `${f.value} ${f.label}`)).toEqual(["26 pantallas", "59 rutas de API", "31 modelos"]);
    ["dos precios más uno manual", "historial de precios", "modelos compatibles", "búsqueda por SKU con acentos", "defectuosos quedan fuera de stock", "límite diario", "WebUSB o USB"].forEach((f) => expect(stockieCopy).toContain(f));
  });

  it("every case has 2-4 hero sets and its diagram's edges and pulses name real nodes", () =>
    cases.forEach((c) => {
      expect(c.heroSets.length).toBeGreaterThanOrEqual(2);
      expect(c.heroSets.length).toBeLessThanOrEqual(4);
      const ids = new Set(c.diagram.nodes.map((n) => n.id));
      c.diagram.edges.forEach((e) => { expect(ids.has(e.from), e.from).toBe(true); expect(ids.has(e.to), e.to).toBe(true); });
      c.diagram.shots.flat(2).forEach((step) => step.split(">").forEach((id) => expect(ids.has(id), `${c.slug}: ${step}`).toBe(true)));
      (c.figures?.items ?? []).forEach((f) => expect(f.value).toMatch(/^\d+$/));
    }));

  it("every diagram icon exists in public/assets/icons", () =>
    cases.forEach((c) => c.diagram.nodes.forEach((n) => { if (n.icon) expect(existsSync(`public/assets/icons/${n.icon}.svg`)).toBe(true); })));

  it("the copy guard catches what it must", () => {
    const hit = (text: string, list: RegExp[]) => list.some((r) => r.test(text));
    expect(hit("Contratame para tu negocio", FORBIDDEN_COPY)).toBe(true);
    expect(hit("Quiero potenciar tu marca", FORBIDDEN_COPY)).toBe(true);
    expect(hit("Comandos con idempotencia", FORBIDDEN_COPY)).toBe(false);
    expect(hit("origen" + "-a", FORBIDDEN_ORIGIN)).toBe(true);
    expect(hit("origen" + "-b", FORBIDDEN_ORIGIN)).toBe(true);
    expect(hit("postgres://u:p@h/db", SECRET_PATTERNS)).toBe(true);
  });
});
