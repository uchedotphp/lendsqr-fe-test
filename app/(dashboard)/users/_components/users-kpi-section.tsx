import { KpiCard } from "@/app/_components/kpi-card/kpi-card";
import {
  USERS_KPI_METRICS,
  type UsersKpiMetric,
} from "@/app/(dashboard)/users/_data/users-kpi-metrics";
import styles from "@/app/(dashboard)/users/styles/users-kpi-section.module.scss";

type UsersKpiSectionProps = {
  /** Override metrics for tests or when parents fetch aggregates. */
  metrics?: readonly UsersKpiMetric[];
};

export function UsersKpiSection({
  metrics = USERS_KPI_METRICS,
}: UsersKpiSectionProps) {
  return (
    <ul className={styles.grid}>
      {metrics.map((metric) => (
        <li key={metric.id} className={styles.item}>
          <KpiCard
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            variant={metric.variant}
          />
        </li>
      ))}
    </ul>
  );
}
