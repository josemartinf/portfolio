import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("seo", () => {
  it("the sitemap lists the home and the three cases on the production origin", () => {
    expect(sitemap().map((e) => e.url)).toEqual([
      "https://www.joseflores.codes",
      "https://www.joseflores.codes/envo",
      "https://www.joseflores.codes/stockie",
      "https://www.joseflores.codes/club-zapateo",
    ]);
  });

  it("robots allows everything and points to the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://www.joseflores.codes/sitemap.xml");
    expect(r.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
