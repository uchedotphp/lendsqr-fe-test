"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/app/(dashboard)/_services/dashboard-api";

export function useDashboardQuery() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });
}
