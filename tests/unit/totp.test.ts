import { describe, expect, it } from "vitest";
// @ts-expect-error módulo .mjs sin tipos
import { totp } from "../../scripts/totp.mjs";

describe("totp", () => {
  it("coincide con el vector de RFC 6238 (SHA-1, T=59s)", () => {
    expect(totp("GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", 59000)).toBe("287082");
  });
  it("devuelve 6 dígitos", () => {
    expect(totp("GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", 1111111109000)).toMatch(/^\d{6}$/);
  });
});
