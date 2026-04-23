"use client";

import { useEffect } from "react";
import { useDashboardQuery } from "@/app/(dashboard)/_hooks/use-dashboard-query";
import { useDashboardStore } from "@/app/(dashboard)/_services/dashboard-store";

export function useDashboardPageData() {
  const dashboardQuery = useDashboardQuery();
  const setDashboardData = useDashboardStore((state) => state.setDashboardData);
  const resetDashboardData = useDashboardStore(
    (state) => state.resetDashboardData,
  );

  useEffect(() => {
    if (dashboardQuery.data) {
      setDashboardData(dashboardQuery.data);
      return;
    }

    if (dashboardQuery.isError) {
      resetDashboardData();
    }
  }, [
    dashboardQuery.data,
    dashboardQuery.isError,
    resetDashboardData,
    setDashboardData,
  ]);

  return {
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
  };
}
