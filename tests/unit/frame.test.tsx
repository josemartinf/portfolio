import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { existsSync } from "node:fs";
import { BrowserFrame, focusSizes } from "@/components/Frame";
import { PHONE_FOCUS } from "@/data/phone-focus";

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

describe("BrowserFrame en un teléfono", () => {
  afterEach(cleanup);
  const panel = { ...shot, src: "/projects/envo-panel.webp" };
  it("carries the capture's phone crop and asks for the file it needs there", () => {
    const { container } = render(<BrowserFrame shot={panel} sizes="600px" />);
    const frame = container.querySelector<HTMLElement>(".bframe--m")!;
    expect(frame.style.getPropertyValue("--m-w")).toBe("0.5");
    expect(document.querySelector("img")).toHaveAttribute("sizes", "(max-width: 639px) 184vw, 600px");
  });
  it("leaves the frame alone without a crop, or when the page turns it off", () => {
    const { container } = render(<><BrowserFrame shot={shot} sizes="600px" /><BrowserFrame shot={panel} sizes="600px" phone={false} /></>);
    expect(container.querySelector(".bframe--m")).toBeNull();
  });
  it("only crops captures that exist, and never past their right edge", () => {
    for (const [src, f] of Object.entries(PHONE_FOCUS)) {
      expect(existsSync(`public${src}`), src).toBe(true);
      expect(f.x + f.w, src).toBeLessThanOrEqual(1);
    }
  });
});
