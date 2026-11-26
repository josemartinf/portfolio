import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { caseMetadata } from "@/lib/metadata";
import { content } from "@/i18n/content";
import { ui } from "@/i18n/ui";

describe("seo", () => {
  it("the sitemap lists the home and the three cases in both languages on the production origin, each naming the other", () => {
    const o = "https://www.joseflores.codes";
    expect(sitemap().map((e) => e.url)).toEqual([
      o, `${o}/envo`, `${o}/stockie`, `${o}/club-zapateo`,
      `${o}/en`, `${o}/en/envo`, `${o}/en/stockie`, `${o}/en/club-zapateo`,
    ]);
    expect(sitemap()[1].alternates?.languages).toEqual({ es: `${o}/envo`, en: `${o}/en/envo` });
    expect(sitemap()[4].alternates?.languages).toEqual({ es: o, en: `${o}/en` });
  });

  // la pestaña de un caso lleva solo el nombre del proyecto: "caso" no se usa en español (en inglés sigue "case study")
  it("a case page title is the project name, without the word caso", () => {
    expect(caseMetadata(content("es").caseBySlug("envo"), "es").title).toBe("Envo | José Martin Flores");
    expect(caseMetadata(content("en").caseBySlug("envo"), "en").title).toBe("Envo: case study | José Martin Flores");
    const es = ui.es;
    [es.meta.description, es.projects.seeCase, es.contact.cases, es.contact.next("Stockie"), es.notFound.text]
      .forEach((text) => expect(text).not.toMatch(/\bcasos?\b/i));
  });

  it("robots allows everything and points to the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://www.joseflores.codes/sitemap.xml");
    expect(r.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
