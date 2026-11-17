import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "../../src/components/ProjectCard";
import type { Project } from "../../src/data/projects";

const base: Project = {
  slug: "stockie", name: "Stockie", category: "producto", summary: "Stock y ventas.",
  highlights: [], stack: ["Next.js"], visible: true,
};

describe("ProjectCard", () => {
  it("renders a project without an image", () => {
    render(<ProjectCard project={{ ...base, image: undefined }} variant="site" />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByRole("heading", { name: base.name })).toBeInTheDocument();
  });

  it("opens a live site safely in a new tab", () => {
    render(<ProjectCard project={{ ...base, liveUrl: "https://x.vercel.app" }} variant="site" />);
    const link = screen.getByRole("link", { name: /ver sitio/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
