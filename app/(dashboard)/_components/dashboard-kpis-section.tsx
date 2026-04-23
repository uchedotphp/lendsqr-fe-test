"use client";

import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";
import { LiaCoinsSolid } from "react-icons/lia";
import { LuBadgeDollarSign, LuUsersRound } from "react-icons/lu";
import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { useDashboardStore } from "@/app/(dashboard)/_services/dashboard-store";
import styles from "@/app/(dashboard)/styles/dashboard-page-view.module.scss";

function formatKpiValue(value: number, currency: boolean): string {
  if (currency && value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `N${millions.toFixed(1).replace(".0", "")}M`;
  }

  const formatted = value.toLocaleString("en-US");
  return currency ? `N${formatted}` : formatted;
}

export function DashboardKpisSection() {
  const kpis = useDashboardStore((state) => state.kpis);
  const iconMap = [
    LuBadgeDollarSign,
    LuUsersRound,
    HiOutlineDocumentCurrencyDollar,
    LiaCoinsSolid,
  ] as const;

  return (
    <section>
      <HeadingText level="h3" size="md" className={styles.sectionTitle}>
        Key Performance Indicators
      </HeadingText>
      <ul className={styles.kpiGrid}>
        {kpis.map((kpi, index) => {
          const Icon = iconMap[index] ?? LuBadgeDollarSign;

          return (
            <li key={kpi.label} className={styles.kpiCard}>
              <div className={styles.kpiCard__iconWrap}>
                <Icon />
              </div>
              <BodyText className={styles.kpiCard__label}>{kpi.label}</BodyText>
              <BodyText className={styles.kpiCard__value}>
                {formatKpiValue(kpi.value, Boolean(kpi.currency))}
              </BodyText>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
