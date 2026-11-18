import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { resolvePath } from "../../scripts/serve-out.mjs";

describe("serve-out resolvePath", () => {
  let tmp = "";
  beforeAll(async () => {
    tmp = await mkdtemp(path.join(tmpdir(), "serve-out-"));
    await writeFile(path.join(tmp, "index.html"), "<p>home</p>");
    await writeFile(path.join(tmp, "envo.html"), "<p>envo</p>");
    await mkdir(path.join(tmp, "projects"));
    await writeFile(path.join(tmp, "projects", "a.webp"), "x");
  });
  afterAll(() => rm(tmp, { recursive: true, force: true }));

  it("serves /x from out/x.html when /x does not exist (como cleanUrls en Vercel)", async () => {
    expect(await resolvePath(tmp, "/envo")).toMatch(/envo\.html$/);
  });
  it("returns null for a page that does not exist", async () => {
    expect(await resolvePath(tmp, "/nada")).toBeNull();
  });
  it("keeps / and real files as they are, and never leaves the root", async () => {
    expect(await resolvePath(tmp, "/")).toBe(path.join(tmp, "index.html"));
    expect(await resolvePath(tmp, "/projects/a.webp")).toBe(path.join(tmp, "projects", "a.webp"));
    expect(await resolvePath(tmp, "/../etc/passwd")).toBeNull();
  });
});
