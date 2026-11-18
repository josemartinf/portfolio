import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("home", () => {
  afterEach(cleanup);

  it("renders the new portfolio home", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("José Martin Flores");
    expect(screen.getAllByRole("link", { name: /Ver el caso/ }).map((a) => a.getAttribute("href"))).toEqual(["/envo", "/stockie", "/club-zapateo"]);
    expect(document.querySelector("#servicios")).toBeNull();
    ["#proyectos", "#sitios", "#sitios-mas", "#experiencia", "#stack", "#herramientas", "#contacto"].forEach((id) => expect(document.querySelector(id)).not.toBeNull());
    // "Escribirme un email" aparece tres veces: el botón lleno del nav, el secundario del hero y el botón grande del
    // cierre (getByRole del brief exigía uno solo). El botón lleno del hero es "Ver los proyectos" (ruling A, abajo).
    const email = screen.getAllByRole("link", { name: "Escribirme un email" });
    expect(email).toHaveLength(3);
    email.forEach((a) => expect(a).toHaveAttribute("href", expect.stringMatching(/^mailto:/)));
    expect(screen.getByRole("link", { name: "Ver los proyectos" })).toHaveAttribute("href", "#proyectos");
    // Ruling A (fix round 1): el botón lleno del hero es "Ver los proyectos"; el email queda como secundario.
    const hero = document.querySelector(".hero")!;
    expect(hero.querySelector(".btn--primary")).toHaveTextContent("Ver los proyectos");
    expect(hero.querySelector(".btn--secondary")).toHaveTextContent("Escribirme un email");
  });

  it("shows the parts and status of every case and site, and no empty tech-sheet part", () => {
    render(<Home />);
    const parts = (slug: string) => (document.querySelector(`[data-project='${slug}'] .parts`)?.textContent ?? "").split(" · ").filter(Boolean);
    expect(parts("envo")).toContain("Mini App de Telegram");
    expect(parts("club-zapateo")).toContain("App de puerta");
    ["envo", "stockie", "club-zapateo", "repuestos", "moodi-home", "aether-aerospace-care"].forEach((slug) => {
      expect(parts(slug).length).toBeGreaterThan(0);
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
    // R1: los puntos de enfoque, cortos, en cada proyecto de la portada.
    const focus = (slug: string) => document.querySelector(`[data-project='${slug}'] .focus`)?.textContent ?? "";
    expect(focus("envo")).toBe("Alta disponibilidad · Autenticación · Base de datos");
    expect(focus("club-zapateo")).toBe("Pagos · Concurrencia");
    ["stockie", "repuestos", "moodi-home", "aether-aerospace-care"].forEach((slug) => expect(focus(slug).length).toBeGreaterThan(0));
    // I3: la ficha completa vive en el caso; en la portada no se repiten Arquitectura, Prácticas ni Patrones.
    expect(document.querySelector("#proyectos").textContent).not.toMatch(/Arquitectura|Prácticas|Patrones/);
    expect(document.querySelector("#sitios").textContent).not.toMatch(/Arquitectura|Prácticas|Patrones/);
    expect(document.querySelector("#sitios-mas").textContent).not.toMatch(/Arquitectura|Prácticas|Patrones/);
    // R2: el statement no le atribuye CI a Envo.
    expect(document.querySelector("#como-trabajo").textContent).not.toMatch(/2938|Envo[^.]*CI/);
    // Moodi Home no tiene prácticas ni patrones: su ficha no muestra esos rótulos vacíos.
    const moodi = document.querySelector("[data-project='moodi-home']")!;
    expect(moodi.textContent).not.toMatch(/Prácticas|Patrones/);
    document.querySelectorAll(".sheet dd").forEach((dd) => expect(dd.textContent!.trim().length).toBeGreaterThan(0));
  });

  it("keeps contact neutral: email, LinkedIn, GitHub and WhatsApp as text links", () => {
    render(<Home />);
    const contact = document.querySelector("#contacto")!;
    ["LinkedIn", "GitHub", "WhatsApp"].forEach((name) => expect(contact.textContent).toContain(name));
    expect(contact.textContent).not.toMatch(/contratame|presupuesto|disponible/i);
  });
});
