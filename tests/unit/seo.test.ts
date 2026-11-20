import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

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

  it("robots allows everything and points to the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://www.joseflores.codes/sitemap.xml");
    expect(r.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
