"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsersKpis } from "@/app/(dashboard)/users/_services/users-api";

export function useUsersKpisQuery() {
  return useQuery({
    queryKey: ["users", "kpis"],
    queryFn: fetchUsersKpis,
  });
}
