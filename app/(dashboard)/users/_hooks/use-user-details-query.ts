"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserDetailsById } from "@/app/(dashboard)/users/_services/users-api";

export function useUserDetailsQuery(userId: string) {
  return useQuery({
    queryKey: ["user-details", userId],
    queryFn: () => fetchUserDetailsById(userId),
    enabled: Boolean(userId),
  });
}
