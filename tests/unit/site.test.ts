import { describe, expect, it } from "vitest";
import { mailtoHref, site, whatsappHref } from "../../src/lib/site";

describe("site links", () => {
  it("prepares a WhatsApp link and preserves the message", () => {
    expect(whatsappHref()).toMatch(/^https:\/\/wa\.me\/5491124078165\?text=/);
    expect(decodeURIComponent(whatsappHref("¿Hacés tiendas online?").split("text=")[1])).toBe("¿Hacés tiendas online?");
  });

  it("prepares email links and exposes the LinkedIn profile", () => {
    expect(mailtoHref("Proyecto")).toBe("mailto:jmfmarin25@gmail.com?subject=Proyecto");
    expect(site.linkedin).toBe("https://www.linkedin.com/in/jmfmarin/");
  });
});
