"use client";

import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { useDashboardStore } from "@/app/(dashboard)/_services/dashboard-store";
import styles from "@/app/(dashboard)/styles/dashboard-page-view.module.scss";

export function DashboardActivitiesSection() {
  const activities = useDashboardStore((state) => state.activities);

  return (
    <section>
      <HeadingText level="h3" size="md" className={styles.sectionTitle}>
        Recent Activities
      </HeadingText>

      <ul className={styles.activityPanel}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.activityItem}>
            <div className={styles.activityItem__left}>
              <BodyText className={styles.activityItem__line}>
                <strong>{activity.user}</strong>
              </BodyText>
              <BodyText className={styles.activityItem__meta}>
                {activity.action}
              </BodyText>
              {activity.amount ? (
                <BodyText className={styles.activityItem__meta}>
                  {activity.amount}
                </BodyText>
              ) : null}
              <BodyText className={styles.activityItem__time}>
                {activity.time}
              </BodyText>
            </div>
            <span
              className={styles.activityItem__status}
              data-status={activity.status}
            >
              {activity.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
