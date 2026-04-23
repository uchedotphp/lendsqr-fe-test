"use client";

import type { IconType } from "react-icons";
import { HiOutlineBell } from "react-icons/hi2";
import { LuEye, LuUserRound } from "react-icons/lu";
import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { useDashboardStore } from "@/app/(dashboard)/_services/dashboard-store";
import styles from "@/app/(dashboard)/styles/dashboard-page-view.module.scss";

type QuickActionItem = {
  label: string;
  description: string;
  actionLabel: string;
  value: number;
  icon: IconType;
};

export function DashboardQuickStatsSection() {
  const quickStats = useDashboardStore((state) => state.quickStats);

  if (!quickStats) {
    return null;
  }

  const items: QuickActionItem[] = [
    {
      label: "Review Applications",
      description: "Check pending loan applications",
      actionLabel: "Take Action",
      value: quickStats.pendingApplications,
      icon: LuEye,
    },
    {
      label: "Activate Users",
      description: "Approve new user registrations",
      actionLabel: "Take Action",
      value: quickStats.usersToActivate,
      icon: LuUserRound,
    },
    {
      label: "Generate Reports",
      description: "Create monthly performance reports",
      actionLabel: "Take Action",
      value: quickStats.newRegistrations,
      icon: HiOutlineBell,
    },
  ];

  return (
    <section>
      <HeadingText level="h3" size="md" className={styles.sectionTitle}>
        Quick Actions
      </HeadingText>

      <ul className={styles.quickActionsGrid}>
        {items.map((item) => (
          <li key={item.label} className={styles.quickActionCard}>
            <div className={styles.quickActionCard__header}>
              <item.icon className={styles.quickActionCard__icon} />
              <span className={styles.quickActionCard__count}>
                {item.value}
              </span>
            </div>
            <BodyText className={styles.quickActionCard__title}>
              {item.label}
            </BodyText>
            <BodyText className={styles.quickActionCard__description}>
              {item.description}
            </BodyText>
            <button type="button" className={styles.quickActionCard__action}>
              {item.actionLabel}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
