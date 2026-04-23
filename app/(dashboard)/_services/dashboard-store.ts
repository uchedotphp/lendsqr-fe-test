"use client";

import { create } from "zustand";
import type {
  DashboardActivity,
  DashboardKpi,
  DashboardQuickStats,
} from "@/app/_lib/types/dashboard";

type DashboardStore = {
  kpis: DashboardKpi[];
  activities: DashboardActivity[];
  quickStats: DashboardQuickStats | null;
  setDashboardData: (payload: {
    kpis: DashboardKpi[];
    activities: DashboardActivity[];
    quickStats: DashboardQuickStats;
  }) => void;
  resetDashboardData: () => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  kpis: [],
  activities: [],
  quickStats: null,
  setDashboardData: ({ kpis, activities, quickStats }) => {
    set({ kpis, activities, quickStats });
  },
  resetDashboardData: () => {
    set({ kpis: [], activities: [], quickStats: null });
  },
}));
