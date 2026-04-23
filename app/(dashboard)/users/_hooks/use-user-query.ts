"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/app/(dashboard)/users/_services/users-api";

export function useUserQuery(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: Boolean(userId),
  });
}
