import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import HomeEs from "@/app/(es)/page";
import HomeEn from "@/app/(en)/en/page";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { content } from "@/i18n/content";
import { localePath } from "@/i18n";
import { ui } from "@/i18n/ui";
import { site } from "@/lib/site";
import { HOME_JARGON } from "@/data/copy-guard";

/* Los dos idiomas: el español en las URLs de siempre, el inglés bajo /en, la misma composición con los textos de su
   idioma, y cada página con su link a la misma página en el otro. */
describe("i18n", () => {
  afterEach(cleanup);

  it("localePath keeps Spanish where it was and puts English under /en", () => {
    expect(localePath("es", "/")).toBe("/");
    expect(localePath("es", "/envo")).toBe("/envo");
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("en", "/envo")).toBe("/en/envo");
    expect(localePath("en", "/#proyectos")).toBe("/en#proyectos");
    expect(localePath("en", "#contacto")).toBe("#contacto");
    expect(localePath("en", "https://envo-demo.tech/demo")).toBe("https://envo-demo.tech/demo");
  });

  it("the English data mirrors the Spanish: same projects, tags, captures and dates in the same order", () => {
    const es = content("es"), en = content("en");
    const srcs = (c: typeof es) => JSON.stringify([c.cases, c.sites, c.tools]).match(/\/projects\/[^"]+\.webp/g);
    expect(en.cases.map((c) => [c.slug, c.tag])).toEqual(es.cases.map((c) => [c.slug, c.tag]));
    expect(en.sites.map((s) => [s.slug, s.tag, s.liveUrl])).toEqual(es.sites.map((s) => [s.slug, s.tag, s.liveUrl]));
    expect(en.tools.map((t) => [t.slug, t.tag])).toEqual(es.tools.map((t) => [t.slug, t.tag]));
    expect(srcs(en)).toEqual(srcs(es));
    expect(en.jobs.map((j) => [j.company, j.from, j.to])).toEqual(es.jobs.map((j) => [j.company, j.from, j.to]));
    expect(en.stackGroups.flatMap((g) => g.items)).toEqual(es.stackGroups.flatMap((g) => g.items));
    // los textos sí cambian
    expect(en.cases[0].lead).not.toBe(es.cases[0].lead);
  });

  it("renders the English home in English, with its links under /en and the English CV", () => {
    render(<HomeEn />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("José Martin Flores");
    expect(document.querySelector("#proyectos-h")).toHaveTextContent("Projects");
    expect([...document.querySelectorAll(".nav__link")].map((a) => a.textContent)).toEqual(["Projects", "Experience", "Stack"]);
    expect(screen.getAllByRole("link", { name: /Read the case study/ }).map((a) => a.getAttribute("href"))).toEqual(["/en/envo", "/en/stockie", "/en/club-zapateo"]);
    expect(document.querySelector(".hero .btn--secondary")).toHaveAttribute("href", site.cvEn);
    expect(document.querySelector("#contacto a[download]")).toHaveAttribute("href", site.cvEn);
    expect([...document.querySelectorAll(".tag")].map((t) => t.textContent)).toEqual(expect.arrayContaining(["Client", "Own product", "Personal"]));
    expect(document.querySelector(".tl__date")?.textContent).toMatch(/present$/);
    // Stockie, desde la tarjeta de GlobalFia y MonJeep, en inglés
    expect(document.querySelector("[data-project='repuestos'] a[href='/en/stockie']")).not.toBeNull();
    // la portada en inglés tampoco nombra mecanismos
    for (const sel of [".hero", "#como-trabajo", "#proyectos"]) {
      expect(document.querySelector(sel)?.textContent ?? "", sel).not.toMatch(HOME_JARGON);
    }
    // la entrada editorial, en inglés
    expect([...document.querySelectorAll(".hero__metas dt")].map((d) => d.textContent)).toEqual(["Now", "I work on", "Since", "Get in touch"]);
    expect(document.querySelector(".hero__metas dd")).toHaveTextContent(/^Software Engineer at Naranja X, in AI automation$/);
    expect(document.querySelector(".hero__band figcaption")).toHaveTextContent("Envo · operations dashboard");
    expect(document.querySelector(".hero__band a")).toHaveAttribute("href", "/en/envo");
    const ld = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.innerHTML);
    expect(ld.url).toBe(`${site.url}/en`);
  });

  it("each home links to the other language", () => {
    render(<HomeEs />);
    const toEn = document.querySelector(".nav__lang")!;
    expect(toEn).toHaveAttribute("href", "/en");
    expect(toEn).toHaveAttribute("hreflang", "en");
    expect(toEn).toHaveAccessibleName("English");
    cleanup();
    render(<HomeEn />);
    const toEs = document.querySelector(".nav__lang")!;
    expect(toEs).toHaveAttribute("href", "/");
    expect(toEs).toHaveAttribute("hreflang", "es");
    expect(toEs).toHaveAccessibleName("Español");
  });

  it("the theme button is hidden until the script shows it, and names the theme it turns to", () => {
    render(<HomeEs />);
    const btn = document.querySelector("[data-theme-toggle]") as HTMLButtonElement;
    expect(btn.hidden).toBe(true);
    expect(btn).toHaveAttribute("data-to-light-label", ui.es.nav.themeToLightLabel);
    expect(btn).toHaveAttribute("data-to-dark-label", ui.es.nav.themeToDarkLabel);
  });

  it("renders an English case page with its nav, buttons and footer links in English and under /en", () => {
    const envo = content("en").caseBySlug("envo");
    render(<CaseStudyPage study={envo} locale="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Envo");
    expect(screen.getByRole("link", { name: "Open the demo" })).toHaveAttribute("href", "https://envo-demo.tech/demo");
    expect([...document.querySelectorAll(".nav__link")].map((a) => a.textContent)).toEqual(["Problem", "Screens", "Architecture", "Decisions", "Summary"]);
    expect(document.querySelector(".nav__logo")).toHaveAttribute("href", "/en");
    expect(document.querySelector(".nav__lang")).toHaveAttribute("href", "/envo");
    expect(document.querySelector("#problema-h")).toHaveTextContent("The problem");
    const close = document.querySelector("footer.closing")!;
    expect([...close.querySelectorAll(".footer__col a")].map((a) => a.getAttribute("href")).filter((h) => h?.startsWith("/"))).toEqual(["/en/stockie", "/en/club-zapateo", "/en", "/en#proyectos", "/en#experiencia", "/en#stack"]);
    expect(close.querySelector("a[download]")).toHaveAttribute("href", site.cvEn);
    // ninguna palabra de la interfaz en castellano
    expect(document.body.textContent).not.toMatch(/Ver la arquitectura|Ficha técnica|Pantallas por rol|Volver al inicio|Siguiente caso/);
  });

  it("the Spanish case page links its English version", () => {
    render(<CaseStudyPage study={content("es").caseBySlug("stockie")} />);
    expect(document.querySelector(".nav__lang")).toHaveAttribute("href", "/en/stockie");
  });
});
