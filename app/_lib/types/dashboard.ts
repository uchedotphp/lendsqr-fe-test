export type DashboardKpi = {
  label: string;
  value: number;
  currency?: boolean;
};

export type DashboardActivity = {
  id: number;
  type: string;
  user: string;
  action: string;
  amount?: string;
  time: string;
  status: "active" | "pending" | "inactive" | "blacklisted";
};

export type DashboardQuickStats = {
  pendingApplications: number;
  usersToActivate: number;
  overduePayments: number;
  newRegistrations: number;
};
