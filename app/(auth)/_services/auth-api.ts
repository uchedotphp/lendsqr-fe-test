import axios from "axios";
import { apiClient } from "@/app/_lib/api/client";
import type { LoginSchema } from "@/app/(auth)/_services/auth-schema";

export async function loginWithApi(payload: LoginSchema): Promise<void> {
  try {
    await apiClient.post("/auth/login", payload);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const data = error.response.data;
      const message =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof (data as { message: unknown }).message === "string"
          ? (data as { message: string }).message
          : "Invalid email or password";
      throw new Error(message);
    }
    throw error instanceof Error ? error : new Error("Login failed");
  }
}
