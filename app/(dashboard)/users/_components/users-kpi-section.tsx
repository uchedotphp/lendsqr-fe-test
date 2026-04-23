"use client";

import { KpiCard } from "@/app/_components/kpi-card/kpi-card";
import { USERS_KPI_CATALOG } from "@/app/(dashboard)/users/_data/users-kpi-metrics";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";
import styles from "@/app/(dashboard)/users/styles/users-kpi-section.module.scss";

function normalizeLabel(value: string): string {
  return value.trim().toLowerCase();
}

export function UsersKpiSection() {
  const usersKpis = useUsersStore((state) => state.usersKpis);

  const apiMetricsMap = new Map(
    usersKpis.map((item) => [normalizeLabel(item.label), item.value]),
  );

  const resolvedMetrics = USERS_KPI_CATALOG.map((metric) => ({
    ...metric,
    value: apiMetricsMap.get(normalizeLabel(metric.label)) ?? 0,
  }));

  return (
    <ul className={styles.grid}>
      {resolvedMetrics.map((metric) => (
        <li key={metric.id} className={styles.item}>
          <KpiCard
            label={metric.label}
            value={metric.value ?? 0}
            icon={metric.icon}
            variant={metric.variant}
          />
        </li>
      ))}
    </ul>
  );
}
