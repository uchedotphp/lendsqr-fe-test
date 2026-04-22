import type { IconType } from "react-icons";
import {
  HiOutlineDocumentCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi2";
import { LiaCoinsSolid } from "react-icons/lia";
import type { KpiCardVariant } from "@/app/_components/kpi-card/kpi-card";

export type UsersKpiMetric = {
  id: string;
  label: string;
  value: number;
  icon: IconType;
  variant: KpiCardVariant;
};

/** Design mock totals; swap for API aggregates when data fetching is added. */
export const USERS_KPI_METRICS: readonly UsersKpiMetric[] = [
  {
    id: "users",
    label: "Users",
    value: 2453,
    icon: HiOutlineUsers,
    variant: "users",
  },
  {
    id: "activeUsers",
    label: "Active users",
    value: 2453,
    icon: HiOutlineUserGroup,
    variant: "activeUsers",
  },
  {
    id: "usersWithLoans",
    label: "Users with loans",
    value: 12453,
    icon: HiOutlineDocumentCurrencyDollar,
    variant: "loans",
  },
  {
    id: "usersWithSavings",
    label: "Users with savings",
    value: 102453,
    icon: LiaCoinsSolid,
    variant: "savings",
  },
];
