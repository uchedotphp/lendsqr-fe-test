import dashboardDb from "@/app/_lib/server/data/dashboard-db.json";
import type {
  DashboardActivity,
  DashboardKpi,
  DashboardQuickStats,
} from "@/app/_lib/types/dashboard";

type RawDashboardDb = {
  dashboardKpis: DashboardKpi[];
  dashboardActivities: DashboardActivity[];
  dashboardQuickStats: DashboardQuickStats;
};

const db = dashboardDb as RawDashboardDb;

export function getDashboardKpis(): DashboardKpi[] {
  return db.dashboardKpis;
}

export function getDashboardActivities(): DashboardActivity[] {
  return db.dashboardActivities;
}

export function getDashboardQuickStats(): DashboardQuickStats {
  return db.dashboardQuickStats;
}
