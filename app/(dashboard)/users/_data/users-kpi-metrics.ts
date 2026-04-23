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
  value?: number;
  icon: IconType;
  variant: KpiCardVariant;
};

export const USERS_KPI_CATALOG: readonly UsersKpiMetric[] = [
  {
    id: "users",
    label: "Users",
    icon: HiOutlineUsers,
    variant: "users",
  },
  {
    id: "activeUsers",
    label: "Active users",
    icon: HiOutlineUserGroup,
    variant: "activeUsers",
  },
  {
    id: "usersWithLoans",
    label: "Users with loans",
    icon: HiOutlineDocumentCurrencyDollar,
    variant: "loans",
  },
  {
    id: "usersWithSavings",
    label: "Users with savings",
    icon: LiaCoinsSolid,
    variant: "savings",
  },
];
