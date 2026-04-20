import { describe, expect, it } from "vitest";
import { credentialsMatch } from "@/app/_lib/server/auth-credentials";

describe("credentialsMatch", () => {
  it("returns true for dummy admin credentials", () => {
    expect(credentialsMatch("admin@lendsqr.com", "Lendsqr123")).toBe(true);
    expect(credentialsMatch("Admin@Lendsqr.com", "Lendsqr123")).toBe(true);
  });

  it("returns false for wrong password or email", () => {
    expect(credentialsMatch("admin@lendsqr.com", "wrong")).toBe(false);
    expect(credentialsMatch("other@lendsqr.com", "Lendsqr123")).toBe(false);
  });
});
