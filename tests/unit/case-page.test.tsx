import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { cases } from "@/data/cases";
import { site } from "@/lib/site";
import { readFileSync } from "node:fs";

const next = (i: number) => cases[(i + 1) % cases.length];

describe("case pages", () => {
  afterEach(cleanup);

  cases.forEach((study, i) => {
    describe(study.name, () => {
      it("has the case name as its h1", () => {
        render(<CaseStudyPage study={study} />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(study.name);
      });

      it("has a section for every part of the case", () => {
        render(<CaseStudyPage study={study} />);
        const ids = ["problema", "pantallas", "arquitectura", "decisiones", ...(study.quality.length > 0 ? ["calidad"] : []), "ficha"];
        ids.forEach((id) => expect(document.querySelector(`section#${id}`), id).not.toBeNull());
        if (study.quality.length === 0) expect(document.querySelector("section#calidad")).toBeNull();
      });

      it("links the next case, round the three", () => {
        render(<CaseStudyPage study={study} />);
        expect(screen.getByRole("link", { name: /Siguiente caso/ })).toHaveAttribute("href", `/${next(i).slug}`);
        // y los otros dos casos, más la vuelta a la portada
        cases.filter((c) => c.slug !== study.slug).forEach((c) => expect(document.querySelector(`a[href='/${c.slug}']`)).not.toBeNull());
        expect(document.querySelector(`a[href='/${study.slug}']`)).toBeNull();
        expect(screen.getByRole("link", { name: /Volver a la portada/ })).toHaveAttribute("href", "/");
      });

      it("draws its architecture as a kit diagram with every node", () => {
        render(<CaseStudyPage study={study} />);
        const el = document.querySelector("section#arquitectura [data-diagram]");
        expect(el).not.toBeNull();
        const spec = JSON.parse(el!.getAttribute("data-diagram")!);
        expect(spec.nodes).toHaveLength(study.diagram.nodes.length);
        expect(spec.nodes.map((n: { label: string }) => n.label)).toEqual(study.diagram.nodes.map((n) => n.label));
        // pulsos activos: nada lo deja quieto a mano
        expect(el!.closest("[data-dg-still]")).toBeNull();
        expect(spec.motion?.pulse).not.toBe("none");
      });

      it("puts every capture in a browser or phone frame, never with text under it", () => {
        render(<CaseStudyPage study={study} />);
        // cada pantalla de cada rol en su marco; la primera de cada rol, fuera del collage del hero (en Envo el teléfono
        // del repartidor va en #roles; en Club Zapateo cada capítulo lleva una captura y la de eventos queda en el hero)
        expect(document.querySelectorAll("#pantallas img").length).toBeGreaterThan(0);
        study.roles.forEach((r) => r.shots.forEach((s, k) => {
          const img = document.querySelector(`main ${k === 0 ? "> section:not(.hero) " : ""}img[src='${s.src}']`);
          expect(img, s.src).not.toBeNull();
          expect(img!.closest(s.frame === "phone" ? ".pframe" : ".bframe"), s.src).not.toBeNull();
        }));
        // los íconos del stack son íconos, no capturas
        document.querySelectorAll("main img:not(.ic)").forEach((img) => {
          const frame = img.closest(".bframe, .pframe")!;
          expect(frame).not.toBeNull();
          expect(frame.nextElementSibling?.matches("figcaption, p")).not.toBe(true);
        });
        expect(document.querySelector("main figcaption")).toBeNull();
      });

      it("carries the full tech sheet, parts, focus and status", () => {
        render(<CaseStudyPage study={study} />);
        const ficha = document.querySelector("section#ficha")!;
        const labels = [...ficha.querySelectorAll("dt")].map((d) => d.textContent);
        ["Arquitectura", "Stack", "Prácticas", "Patrones"].forEach((l, k) => {
          const items = [study.sheet.architecture, study.sheet.stack, study.sheet.practices, study.sheet.patterns][k];
          if (items.length > 0) expect(labels).toContain(l);
          else expect(labels).not.toContain(l);
        });
        study.sheet.patterns.forEach((p) => expect(ficha.textContent).toContain(p));
        study.focus.forEach((f) => expect(ficha.textContent).toContain(f.split(":")[0].trim()));
        const hero = document.querySelector(".hero")!;
        study.parts.forEach((p) => expect(hero.textContent).toContain(p));
        // las partes también en la ficha, que se ve a todo ancho (el hero las resume en una línea en tablet y teléfono)
        expect(labels).toContain("Partes");
        study.parts.forEach((p) => expect(ficha.textContent).toContain(p));
        expect(hero.textContent).toContain(study.status.split(" en ")[0]);
        // la cifra dura del hero (copy-fact) es una de las que constan en el caso
        expect(hero.querySelector(".case-hero__status")!.textContent).toContain(study.heroFact);
        // el stack de la ficha: un muro de baldosas con su ícono y su nombre, una imagen para un lector de pantalla
        const wall = ficha.querySelector("ul.case-stack[role='img']")!;
        expect(wall.getAttribute("aria-label")).toBe(`Stack: ${study.sheet.stack.join(", ")}`);
        expect(wall.querySelectorAll("li.case-stack__tile")).toHaveLength(study.sheet.stack.length);
        document.querySelectorAll(".sheet dd").forEach((dd) => expect(dd.textContent!.trim().length).toBeGreaterThan(0));
      });

      it("ends with a neutral contact close", () => {
        render(<CaseStudyPage study={study} />);
        const close = document.querySelector("footer.closing")!;
        // revisión 2026-11-18: el email escrito (mailto) con su botón para copiarlo, y el CV
        expect(close.querySelector(".email-copy__addr")).toHaveAttribute("href", `mailto:${site.email}`);
        expect(close.querySelector(".email-copy__addr")).toHaveTextContent(site.email);
        expect(close.querySelector("button[data-copy]")).not.toBeNull();
        expect(close.querySelector("a[download]")).toHaveAttribute("href", site.cv);
        expect(close.textContent).not.toMatch(/contratame|presupuesto|disponible|busco/i);
      });
    });
  });

  it("gives every case its own section subtitles (fix round 1, G1)", () => {
    const subs = cases.map((study) => {
      render(<CaseStudyPage study={study} />);
      const sub = (id: string) => document.querySelector(`section#${id} .section-head p`)?.textContent ?? "";
      const out = { decisiones: sub("decisiones"), calidad: sub("calidad") };
      cleanup();
      return out;
    });
    subs.forEach((s) => expect(s.decisiones.length).toBeGreaterThan(0));
    expect(new Set(subs.map((s) => s.decisiones)).size).toBe(cases.length);
    const calidad = subs.map((s) => s.calidad).filter(Boolean);
    expect(new Set(calidad).size).toBe(calidad.length);
  });

  it("puts every hero window on one scale: the main windows share one width of capture, the second ones another (M4)", () => {
    const mains = cases.flatMap((c) => c.heroSets.map((s) => s.main)).filter((s) => s.frame === "browser");
    const sides = cases.flatMap((c) => c.heroSets.map((s) => s.side)).filter((s) => s?.frame === "browser");
    expect(new Set(mains.map((s) => s.focus?.w)).size).toBe(1);
    expect(new Set(sides.map((s) => s!.focus?.w)).size).toBe(1);
    // y cada set tiene una segunda pieza (M5)
    cases.forEach((c) => c.heroSets.forEach((s) => expect(s.side, `${c.name} ${s.label}`).toBeDefined()));
  });

  it("shows Club Zapateo's 252 tests as a bare figure in Calidad, never on a card (M3)", () => {
    render(<CaseStudyPage study={cases[2]} />);
    // la estructura del spec: Calidad y evidencia también en Club Zapateo (252 tests y el CI)
    expect(document.querySelector("section#calidad")).not.toBeNull();
    expect(document.querySelector("#calidad .t-stat")).toHaveTextContent("252");
    expect(document.querySelector("#calidad .t-stat")!.closest(".frame, .case-quality__panel, .case-ci")).toBeNull();
    expect(document.querySelector("#calidad .case-ci[role='img']")).toHaveAttribute("aria-label", expect.stringMatching(/lint, tipos, los tests con cobertura y el build/));
    expect(document.querySelector("#ficha .t-stat")).toBeNull();
  });

  it("names a frame short on a phone when its title runs long (M10)", () => {
    cases.forEach((study) => {
      render(<CaseStudyPage study={study} />);
      document.querySelectorAll(".bframe__label").forEach((l) => {
        const short = l.getAttribute("data-label-short") ?? l.getAttribute("data-label")!;
        expect(short.length, l.getAttribute("data-label")!).toBeLessThanOrEqual(24);
      });
      cleanup();
    });
  });

  it("Envo links its public demo (/demo, never /admin or /login) and opens it from the hero", () => {
    render(<CaseStudyPage study={cases[0]} />);
    const demo = screen.getByRole("link", { name: "Abrir la demo" });
    expect(demo).toHaveAttribute("href", "https://envo-demo.tech/demo");
    expect(demo).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(document.querySelector("a[href*='/admin'], a[href*='/login']")).toBeNull();
    // revisión 2026-11-18: la demo es el botón principal, junto al título; la arquitectura queda como secundario
    expect(document.querySelector(".hero .btn--primary")).toHaveAttribute("href", "https://envo-demo.tech/demo");
    expect(document.querySelector(".case-hero__text .btn--secondary")).toHaveAttribute("href", "#arquitectura");
    expect(document.querySelector(".case-hero__code")).toHaveTextContent("El código es privado");
  });

  it("Club Zapateo, without a demo, leads with the architecture", () => {
    render(<CaseStudyPage study={cases[2]} />);
    expect(document.querySelector(".hero .btn--primary")).toHaveAttribute("href", "#arquitectura");
  });

  it("Envo and Stockie roll their verified figures; Club Zapateo pins its chapters", () => {
    render(<CaseStudyPage study={cases[0]} />);
    expect([...document.querySelectorAll("#calidad [data-moment='counter-rolls'] .t-stat")].map((e) => e.textContent)).toEqual(["2938", "84", "150", "86"]);
    cleanup();
    render(<CaseStudyPage study={cases[1]} />);
    expect([...document.querySelectorAll("#calidad [data-moment='counter-rolls'] .t-stat")].map((e) => e.textContent)).toEqual(["16", "12", "59", "31"]);
    cleanup();
    render(<CaseStudyPage study={cases[2]} />);
    expect(document.querySelector("section#pantallas[data-moment='pinned-chapters']")).not.toBeNull();
    expect(document.querySelectorAll("#pantallas .mo-pc__step")).toHaveLength(3);
    expect(document.querySelector("[data-moment='counter-rolls']")).toBeNull();
    // un solo momento por página
    expect(document.querySelectorAll("[data-moment]")).toHaveLength(1);
  });

  it("preloads only its own dealt moment (moments.md); the home's two live on the home, not in the layout", () => {
    cases.forEach((study) => {
      render(<CaseStudyPage study={study} />);
      const hrefs = [...document.querySelectorAll("link[rel='modulepreload']")].map((l) => l.getAttribute("href"));
      expect(hrefs).toContain(`/assets/moments/${study.moment}/moment.js`);
      expect(hrefs.filter((h) => /liquid-type|iris-opens/.test(h ?? ""))).toHaveLength(0);
      cleanup();
    });
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    expect(layout).not.toMatch(/(liquid-type|iris-opens)\/moment\.js/);
    expect(readFileSync("src/app/page.tsx", "utf8")).toMatch(/liquid-type\/moment\.js[\s\S]*iris-opens\/moment\.js/);
  });
});
