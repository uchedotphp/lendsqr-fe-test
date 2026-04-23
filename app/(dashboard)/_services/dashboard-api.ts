import { apiClient } from "@/app/_lib/api/client";
import type {
  DashboardActivity,
  DashboardKpi,
  DashboardQuickStats,
} from "@/app/_lib/types/dashboard";

type DashboardResponse = {
  kpis: DashboardKpi[];
  activities: DashboardActivity[];
  quickStats: DashboardQuickStats;
};

export async function fetchDashboardData(): Promise<DashboardResponse> {
  const response = await apiClient.get<DashboardResponse>("/dashboard");
  return response.data;
}
