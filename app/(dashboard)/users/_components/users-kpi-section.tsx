"use client";

import { KpiCard } from "@/app/_components/kpi-card/kpi-card";
import {
  USERS_KPI_CATALOG,
  type UsersKpiMetric,
} from "@/app/(dashboard)/users/_data/users-kpi-metrics";
import { useUsersKpisQuery } from "@/app/(dashboard)/users/_hooks/use-users-kpis-query";
import styles from "@/app/(dashboard)/users/styles/users-kpi-section.module.scss";

type UsersKpiSectionProps = {
  /** Override metrics for tests. */
  metrics?: readonly Required<UsersKpiMetric>[];
};

function normalizeLabel(value: string): string {
  return value.trim().toLowerCase();
}

export function UsersKpiSection({ metrics }: UsersKpiSectionProps) {
  const { data } = useUsersKpisQuery();

  const apiMetricsMap = new Map(
    (data ?? []).map((item) => [normalizeLabel(item.label), item.value]),
  );

  const resolvedMetrics =
    metrics ??
    USERS_KPI_CATALOG.map((metric) => ({
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
