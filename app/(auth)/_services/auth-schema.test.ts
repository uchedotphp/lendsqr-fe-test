import { describe, expect, it } from "vitest";
import { loginSchema } from "@/app/(auth)/_services/auth-schema";

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "admin@lendsqr.com",
      password: "Lendsqr123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects malformed credentials", () => {
    const result = loginSchema.safeParse({
      email: "invalid",
      password: "short",
    });

    expect(result.success).toBe(false);
  });
});
