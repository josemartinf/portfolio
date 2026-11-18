import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { BrowserFrame, focusSizes } from "@/components/Frame";

const shot = { src: "/projects/x.webp", alt: "x", frame: "browser" as const, title: "X" };

describe("BrowserFrame focus", () => {
  afterEach(cleanup);
  it("scales every length in sizes by 1 / w, so a focused capture never asks for a smaller file than it shows", () => {
    expect(focusSizes("(max-width: 1023px) 92vw, 1200px", 0.5)).toBe("(max-width: 1023px) 184vw, 2400px");
    expect(focusSizes("1600px", 0.8)).toBe("2000px");
  });
  it("passes the scaled sizes to the image only when it shows a part", () => {
    render(<BrowserFrame shot={shot} sizes="600px" focus={{ x: 0.2, w: 0.5 }} />);
    expect(document.querySelector("img")).toHaveAttribute("sizes", "1200px");
    cleanup();
    render(<BrowserFrame shot={shot} sizes="600px" />);
    expect(document.querySelector("img")).toHaveAttribute("sizes", "600px");
  });
});
