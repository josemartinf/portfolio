// @vitest-environment node
import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { cases, envoHealthShot } from "@/data/cases";
import { sites } from "@/data/sites";
import { tools } from "@/data/tools";
import type { Shot } from "@/data/types";

const shots: Shot[] = [
  ...cases.flatMap((c) => [c.heroShot, ...c.roles.flatMap((r) => r.shots)]),
  envoHealthShot,
  ...sites.map((s) => s.shot),
  ...tools.flatMap((t) => (t.shot ? [t.shot] : [])),
];
const file = (src: string) => path.join(process.cwd(), "public", src);

describe("assets de capturas", () => {
  it("hay capturas declaradas", () => expect(shots.length).toBeGreaterThan(0));
  it.each([...new Set(shots.map((s) => s.src))])("%s tiene el tamaño de su marco", async (src) => {
    const shot = shots.find((s) => s.src === src)!;
    expect(existsSync(file(src))).toBe(true);
    const meta = await sharp(file(src)).metadata();
    if (shot.frame === "phone") {
      expect([meta.width, meta.height]).toEqual([780, 1688]);
    } else {
      expect([meta.width, meta.height]).toEqual([1600, shot.height ?? 1000]);
      const small = file(src.replace(/\.webp$/, "-800.webp"));
      expect(existsSync(small)).toBe(true);
      const m2 = await sharp(small).metadata();
      expect([m2.width, m2.height]).toEqual([800, Math.round((shot.height ?? 1000) / 2)]);
    }
  });
});
