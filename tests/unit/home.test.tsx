import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "@/app/(es)/page";
import { site } from "@/lib/site";
import { HOME_JARGON } from "@/data/copy-guard";

describe("home", () => {
  afterEach(cleanup);

  it("renders the new portfolio home", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("José Martin Flores");
    expect(screen.getAllByRole("link", { name: /Ver el caso/ }).map((a) => a.getAttribute("href"))).toEqual(["/envo", "/stockie", "/club-zapateo"]);
    expect(document.querySelector("#servicios")).toBeNull();
    ["#proyectos", "#proyectos-mas", "#experiencia", "#stack", "#contacto"].forEach((id) => expect(document.querySelector(id)).not.toBeNull());
    // Revisión 2026-11-20: una sola sección de proyectos; ya no hay "Sitios" ni "Proyecto personal" sueltos.
    ["#sitios", "#sitios-mas", "#herramientas"].forEach((id) => expect(document.querySelector(id)).toBeNull());
    expect(document.querySelector("#proyectos-h")).toHaveTextContent("Proyectos");
    expect([...document.querySelectorAll(".nav__link")].map((a) => a.textContent)).toEqual(["Proyectos", "Experiencia", "Stack"]);
    // Revisión 2026-11-18: la acción del nav lleva al cierre, donde el email está escrito (un mailto solo no hace nada
    // sin cliente de correo); el secundario del hero descarga el CV.
    expect(document.querySelector(".nav .btn--primary")).toHaveAttribute("href", "#contacto");
    expect(screen.getByRole("link", { name: "Ver los proyectos" })).toHaveAttribute("href", "#proyectos");
    const hero = document.querySelector(".hero")!;
    expect(hero.querySelector(".btn--primary")).toHaveTextContent("Ver los proyectos");
    const cv = hero.querySelector(".btn--secondary")!;
    expect(cv).toHaveTextContent("Descargar el CV");
    expect(cv).toHaveAttribute("href", site.cv);
    expect(cv).toHaveAttribute("download");
    // el statement va justo después del hero, antes de los casos
    const order = [...document.querySelectorAll("main > section")].map((s) => s.id);
    expect(order.slice(1, 3)).toEqual(["como-trabajo", "proyectos"]);
    // los demás proyectos siguen a los casos, antes de la experiencia; el proyecto personal ya no queda después del stack
    expect(order.indexOf("proyectos-mas")).toBe(order.indexOf("club-zapateo") + 1);
    expect(order.indexOf("proyectos-mas")).toBeLessThan(order.indexOf("experiencia"));
    expect(order.at(-1)).toBe("stack");
    // los datos de la persona para los buscadores
    const ld = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.innerHTML);
    expect(ld).toMatchObject({ "@type": "Person", name: site.name, sameAs: expect.arrayContaining([site.github]) });
  });

  it("shows the parts and status of every case, the status of every site, and no empty tech-sheet part", () => {
    render(<Home />);
    const parts = (slug: string) => (document.querySelector(`[data-project='${slug}'] .parts`)?.textContent ?? "").split(" · ").filter(Boolean);
    expect(parts("envo")).toContain("App del repartidor en Telegram");
    expect(parts("club-zapateo")).toContain("Control de acceso con QR");
    ["envo", "stockie", "club-zapateo"].forEach((slug) => expect(parts(slug).length).toBeGreaterThan(0));
    ["envo", "stockie", "club-zapateo", "repuestos", "moodi-home", "aether-aerospace-care"].forEach((slug) => {
      expect(document.querySelector(`[data-project='${slug}'] .status`)?.textContent?.trim()).toBeTruthy();
    });
    expect(screen.getByText(/En uso en MonJeep y GlobalFia/)).toBeInTheDocument();
    expect(document.querySelector("[data-project='club-zapateo'] .status")).toHaveTextContent("En producción en clubzapateo.com");
    // Ruling D: la demo pública de Envo, como link externo a /demo (nunca /admin ni /login).
    const envoStatus = document.querySelector("[data-project='envo'] .status")!;
    expect(envoStatus).toHaveTextContent("Demo en línea en envo-demo.tech");
    expect(envoStatus.querySelector("a")).toHaveAttribute("href", "https://envo-demo.tech/demo");
    expect(envoStatus.querySelector("a")).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(document.querySelector("a[href*='envo-demo.tech/admin'], a[href*='envo-demo.tech/login']")).toBeNull();
    // Revisión 2026-11-18: el enfoque vive en la ficha de cada caso; la portada no repite "Partes" ni "Enfoque" como filas.
    expect(document.querySelector("[data-project] .focus")).toBeNull();
    ["#proyectos", "#proyectos-mas"].forEach((id) => expect(document.querySelector(id)!.textContent).not.toMatch(/Enfoque|Partes/));
    // la imagen de cada caso también lleva al caso, fuera del orden del teclado
    ["envo", "stockie", "club-zapateo"].forEach((slug) => {
      const a = document.querySelector(`[data-project='${slug}'] a.case__visual-link`)!;
      expect(a).toHaveAttribute("href", `/${slug}`);
      expect(a).toHaveAttribute("tabindex", "-1");
      expect(a).toHaveAttribute("aria-hidden", "true");
    });
    // I3: la ficha completa vive en el caso; en la portada no se repiten Arquitectura, Prácticas ni Patrones.
    expect(document.querySelector("#proyectos").textContent).not.toMatch(/Arquitectura|Prácticas|Patrones/);
    expect(document.querySelector("#proyectos-mas").textContent).not.toMatch(/Arquitectura|Prácticas|Patrones/);
    // R2: el statement no le atribuye CI a Envo.
    expect(document.querySelector("#como-trabajo").textContent).not.toMatch(/2938|Envo[^.]*CI/);
    // Moodi Home no tiene prácticas ni patrones: su ficha no muestra esos rótulos vacíos.
    const moodi = document.querySelector("[data-project='moodi-home']")!;
    expect(moodi.textContent).not.toMatch(/Prácticas|Patrones/);
    document.querySelectorAll(".sheet dd").forEach((dd) => expect(dd.textContent!.trim().length).toBeGreaterThan(0));
  });

  it("tags every project: the cases, the client sites and the personal one", () => {
    render(<Home />);
    const tag = (slug: string) => document.querySelector(`[data-project='${slug}'] .tag`)?.textContent;
    expect(tag("envo")).toBe("Producto propio");
    expect(tag("stockie")).toBe("Producto propio");
    ["club-zapateo", "repuestos", "moodi-home", "aether-aerospace-care"].forEach((slug) => expect(tag(slug), slug).toBe("Cliente"));
    expect(tag("rd550-mac")).toBe("Personal");
    // el driver va en la grilla con los demás, no en una sección propia
    expect(document.querySelector("#proyectos-mas [data-project='rd550-mac']")).not.toBeNull();
  });

  it("talks results, not mechanisms, in the hero, the statement and the projects", () => {
    render(<Home />);
    [".hero", "#como-trabajo", "#proyectos", "#proyectos-mas"].forEach((sel) => {
      const el = document.querySelector(sel);
      expect(el, sel).not.toBeNull();
      // el texto visible y también lo que lee un lector de pantalla (alt y aria-label)
      const text = [el!.textContent, ...[...el!.querySelectorAll("[alt], [aria-label]")].map((n) => `${n.getAttribute("alt") ?? ""} ${n.getAttribute("aria-label") ?? ""}`)].join(" ");
      expect(text.match(HOME_JARGON)?.[0], sel).toBeUndefined();
    });
  });

  it("keeps contact neutral: email, LinkedIn, GitHub and WhatsApp as text links", () => {
    render(<Home />);
    const contact = document.querySelector("#contacto")!;
    // la dirección se lee escrita, es un mailto y tiene su botón para copiarla (oculto hasta que site.js lo muestra)
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
    expect(contact.querySelector(`button[data-copy='${site.email}']`)).not.toBeNull();
    expect(contact.querySelector("a[download]")).toHaveAttribute("href", site.cv);
    ["LinkedIn", "GitHub", "WhatsApp"].forEach((name) => expect(contact.textContent).toContain(name));
    expect(contact.textContent).not.toMatch(/contratame|presupuesto|disponible/i);
  });
});
