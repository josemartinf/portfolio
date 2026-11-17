import { describe, expect, it } from "vitest";
import { projects, projectsBy } from "../../src/data/projects";

describe("projects", () => {
  it("lists the selected projects in order", () => {
    const slugs = projects.map((project) => project.slug);
    expect(slugs).toEqual([
      "envo", "stokie", "zapateo-club", "moodi-home", "globalfia", "monjeep",
      "aether-aerospace-care", "postulator", "rd550-mac", "trading-bot",
    ]);
    expect(slugs).not.toContain("hotcuer");
    expect(slugs.some((slug) => slug.includes("caracas"))).toBe(false);
    expect(JSON.stringify(projects)).not.toMatch(new RegExp("good[\\s-]?" + "trip", "i"));
  });

  it("keeps product usage and public client URLs", () => {
    expect(projects.find((project) => project.slug === "stokie")!.usedBy).toEqual(["MonJeep", "GlobalFia"]);
    expect(projectsBy("cliente").every((project) => project.liveUrl?.startsWith("https://"))).toBe(true);
  });

  it("filters hidden projects", () => {
    const envo = projects.find((project) => project.slug === "envo")!;
    envo.visible = false;
    try {
      expect(projectsBy("producto").map((project) => project.slug)).toEqual(["stokie"]);
    } finally {
      envo.visible = true;
    }
  });
});
