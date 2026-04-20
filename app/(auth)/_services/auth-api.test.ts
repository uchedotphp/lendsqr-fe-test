import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { apiClient } from "@/app/_lib/api/client";
import { loginWithApi } from "@/app/(auth)/_services/auth-api";

vi.mock("@/app/_lib/api/client", () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

describe("loginWithApi", () => {
  it("resolves when login succeeds", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { success: true },
    });

    await expect(
      loginWithApi({
        email: "admin@lendsqr.com",
        password: "Lendsqr123",
      }),
    ).resolves.toBeUndefined();
  });

  it("maps 401 responses to a clear error", async () => {
    const err = new axios.AxiosError("Unauthorized");
    err.response = {
      status: 401,
      data: { message: "Invalid email or password" },
    } as typeof err.response;

    vi.mocked(apiClient.post).mockRejectedValueOnce(err);

    await expect(
      loginWithApi({
        email: "a@b.com",
        password: "WrongPass1",
      }),
    ).rejects.toThrow("Invalid email or password");
  });
});
