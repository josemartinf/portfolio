import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "@/app/(es)/page";
import { site } from "@/lib/site";
import { HOME_JARGON } from "@/data/copy-guard";
import { caseBySlug } from "@/data/cases";

describe("home", () => {
  afterEach(cleanup);

  it("renders the new portfolio home", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("José Martin Flores");
    expect(screen.getAllByRole("link", { name: /Ver el caso/ }).map((a) => a.getAttribute("href"))).toEqual(["/envo", "/stockie", "/club-zapateo"]);
    expect(document.querySelector("#servicios")).toBeNull();
    ["#proyectos", "#experiencia", "#stack", "#contacto"].forEach((id) => expect(document.querySelector(id)).not.toBeNull());
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
    expect(order.at(-1)).toBe("stack");
    // los datos de la persona para los buscadores
    const ld = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.innerHTML);
    expect(ld).toMatchObject({ "@type": "Person", name: site.name, sameAs: expect.arrayContaining([site.github]) });
  });

  // Revisión 2026-11-20 (portada editorial): el nombre enorme, la fila de datos, la frase con las dos acciones y la
  // captura de Envo que asoma; sin el paisaje, la tarjeta del pedido ni la línea de abajo.
  it("renders the editorial hero", () => {
    render(<Home />);
    const hero = document.querySelector(".hero.hero--editorial")!;
    expect(hero).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName("José Martin Flores, Software Engineer");
    const metas = [...hero.querySelectorAll(".hero__metas dt")].map((d) => d.textContent);
    expect(metas).toEqual(["Hoy", "Hago", "Desde", "Escribime"]);
    const dd = [...hero.querySelectorAll(".hero__metas dd")];
    expect(dd[0]).toHaveTextContent(/^Software Engineer en Naranja X$/);
    expect(dd[0].textContent).not.toMatch(/SSR/);
    expect(dd[1]).toHaveTextContent("Backend, integraciones y automatización con IA");
    expect(dd[2]).toHaveTextContent("2019, siempre en banca y fintech");
    expect([...dd[3].querySelectorAll("a")].map((a) => a.getAttribute("href"))).toEqual(["#contacto", site.linkedin, site.github]);
    dd[3].querySelectorAll("a[target=_blank]").forEach((a) => expect(a.getAttribute("rel")).toContain("noopener"));
    expect(hero.querySelector(".hero__claim")).toHaveTextContent("Hago sistemas de pedidos, stock y pagos que siguen funcionando cuando algo falla.");
    const band = hero.querySelector("figure.hero__band")!;
    expect(band.querySelector("figcaption")).toHaveTextContent("Envo · panel de operación");
    const bandLink = band.querySelector("a")!;
    expect(bandLink).toHaveAttribute("href", "/envo");
    expect(bandLink).toHaveAttribute("tabindex", "-1");
    expect(bandLink).toHaveAttribute("aria-hidden", "true");
    expect(band.querySelector("img")!.getAttribute("src")).toBe("/projects/envo-panel.webp");
    expect(hero.querySelector("[data-fx], .hero-note, .hero__proof")).toBeNull();
  });

  // Revisión 2026-11-20 (portada editorial): los siete proyectos en una sola grilla de bloques numerados; los tres casos
  // con sus tres hechos, su estado y "Ver el caso"; los sitios con su estado y su línea de stack. Las partes, el
  // diagrama de Envo y las viñetas de los sitios salieron de la portada (siguen en las páginas de caso).
  it("lays the seven projects out as numbered tiles", () => {
    render(<Home />);
    const order = [...document.querySelectorAll("main > section")].map((s) => s.id);
    expect(order.slice(1)).toEqual(["como-trabajo", "proyectos", "experiencia", "stack"]);
    ["#stockie", "#club-zapateo", "#proyectos-mas"].forEach((id) => expect(document.querySelector(id)).toBeNull());
    const tiles = [...document.querySelectorAll("#proyectos li.ptile")];
    expect(tiles.map((t) => t.getAttribute("data-project"))).toEqual(["envo", "stockie", "club-zapateo", "repuestos", "moodi-home", "aether-aerospace-care", "rd550-mac"]);
    expect(tiles.map((t) => t.querySelector(".ptile__n")!.textContent)).toEqual(["01", "02", "03", "04", "05", "06", "07"]);
    expect(document.querySelector("#proyectos-h .projects__count")).toHaveTextContent("(07)");
    for (const slug of ["envo", "stockie", "club-zapateo"] as const) {
      const t = document.querySelector(`[data-project='${slug}']`)!;
      expect([...t.querySelectorAll(".ptile__facts li")].map((li) => li.textContent)).toEqual(caseBySlug(slug).homeFacts);
      expect(t.querySelector(".status")!.textContent!.trim()).toBeTruthy();
      const media = t.querySelector("a.ptile__media-link")!;
      expect(media).toHaveAttribute("href", `/${slug}`);
      expect(media).toHaveAttribute("tabindex", "-1");
      expect(media).toHaveAttribute("aria-hidden", "true");
      expect(t.querySelector(".parts")).toBeNull();
    }
    for (const slug of ["repuestos", "moodi-home", "aether-aerospace-care"]) {
      const t = document.querySelector(`[data-project='${slug}']`)!;
      expect(t.querySelector(".status")!.textContent!.trim()).toBeTruthy();
      // los puntos medios pegados a la palabra de antes: un renglón nunca empieza con "·"
      expect(t.querySelector(".ptile__stack")!.textContent).toMatch(/\u00a0· /);
      expect(t.querySelector(".ptile__stack")!.textContent).not.toMatch(/ ·/);
      expect(t.querySelector("a.ptile__media-link")).toHaveAttribute("target", "_blank");
    }
    const rd = document.querySelector("[data-project='rd550-mac']")!;
    expect(rd.querySelector("a.ptile__media-link, .status")).toBeNull();
    expect(rd.querySelector(".ptile__stack")).not.toBeNull();
    expect(document.querySelector("[data-project='repuestos'] a[href='/stockie']")).not.toBeNull();
    expect(screen.getByText(/En uso en MonJeep y GlobalFia/)).toBeInTheDocument();
    // Ruling D: la demo pública de Envo, como link externo a /demo (nunca /admin ni /login).
    expect(document.querySelector("[data-project='envo'] .status a")).toHaveAttribute("href", "https://envo-demo.tech/demo");
    expect(document.querySelector("[data-project='envo'] .status a")).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(document.querySelector("a[href*='envo-demo.tech/admin'], a[href*='envo-demo.tech/login']")).toBeNull();
    expect(document.querySelector("#proyectos")!.textContent).not.toMatch(/Arquitectura|Prácticas|Patrones|Enfoque|Partes/);
    // R2: el statement no le atribuye CI a Envo.
    expect(document.querySelector("#como-trabajo")!.textContent).not.toMatch(/2938|Envo[^.]*CI/);
  });

  it("tags every project: the cases, the client sites and the personal one", () => {
    render(<Home />);
    const tag = (slug: string) => document.querySelector(`[data-project='${slug}'] .tag`)?.textContent;
    expect(tag("envo")).toBe("Producto propio");
    expect(tag("stockie")).toBe("Producto propio");
    ["club-zapateo", "repuestos", "moodi-home", "aether-aerospace-care"].forEach((slug) => expect(tag(slug), slug).toBe("Cliente"));
    expect(tag("rd550-mac")).toBe("Personal");
    // el driver va en la grilla con los demás, no en una sección propia
    expect(document.querySelector("#proyectos [data-project='rd550-mac']")).not.toBeNull();
  });

  it("talks results, not mechanisms, in the hero, the statement and the projects", () => {
    render(<Home />);
    [".hero", "#como-trabajo", "#proyectos"].forEach((sel) => {
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
