"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { routes } from "@/app/_lib/constants/routes";
import { loginWithApi } from "@/app/(auth)/_services/auth-api";
import type { LoginSchema } from "@/app/(auth)/_services/auth-schema";
import { loginSchema } from "@/app/(auth)/_services/auth-schema";
import { useAuthStore } from "@/app/(auth)/_services/auth-store";

export function useLoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const submitLogin = form.handleSubmit(async (payload) => {
    try {
      await loginWithApi(payload);
      login(payload.email);
      router.push(routes.dashboard);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid email or password";
      toast.error(message);
    }
  });

  return {
    form,
    submitLogin,
  };
}
