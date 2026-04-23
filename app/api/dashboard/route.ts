import {
  getDashboardActivities,
  getDashboardKpis,
  getDashboardQuickStats,
} from "@/app/_lib/server/dashboard-repository";
import { simulateLatency } from "@/app/_lib/server/simulate-latency";

export async function GET() {
  await simulateLatency(250);

  return Response.json({
    kpis: getDashboardKpis(),
    activities: getDashboardActivities(),
    quickStats: getDashboardQuickStats(),
  });
}
