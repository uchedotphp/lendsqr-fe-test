"use client";

import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { DashboardActivitiesSection } from "@/app/(dashboard)/_components/dashboard-activities-section";
import { DashboardKpisSection } from "@/app/(dashboard)/_components/dashboard-kpis-section";
import { DashboardQuickStatsSection } from "@/app/(dashboard)/_components/dashboard-quick-stats-section";
import { useDashboardPageData } from "@/app/(dashboard)/_hooks/use-dashboard-page-data";
import styles from "@/app/(dashboard)/styles/dashboard-page-view.module.scss";

export function DashboardPageView() {
  const { isLoading, isError } = useDashboardPageData();

  if (isLoading) {
    return <BodyText>Loading dashboard...</BodyText>;
  }

  if (isError) {
    return <BodyText>Unable to load dashboard at the moment.</BodyText>;
  }

  return (
    <section className={styles.dashboard}>
      <header>
        <HeadingText level="h2" size="xl" className={styles.dashboard__title}>
          Dashboard
        </HeadingText>
      </header>

      <DashboardKpisSection />
      <DashboardQuickStatsSection />
      <DashboardActivitiesSection />
    </section>
  );
}
