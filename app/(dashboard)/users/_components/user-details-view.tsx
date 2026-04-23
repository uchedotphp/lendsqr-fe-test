"use client";

import { BackLink } from "@/app/_components/back-link/back-link";
import { BodyText } from "@/app/_components/typography/body-text";
import { UserDetailsTabContent } from "@/app/(dashboard)/users/_components/user-details-tab-content";
import { UserDetailsTabs } from "@/app/(dashboard)/users/_components/user-details-tabs";
import { UserDetailsTopHeader } from "@/app/(dashboard)/users/_components/user-details-top-header";
import { UserSummaryCard } from "@/app/(dashboard)/users/_components/user-summary-card";
import { useUserDetailsPageData } from "@/app/(dashboard)/users/_hooks/use-user-details-page-data";
import styles from "@/app/(dashboard)/users/styles/user-details-view.module.scss";

type UserDetailsViewProps = {
  userId: string;
};

export function UserDetailsView({ userId }: UserDetailsViewProps) {
  const { isLoading, isError } = useUserDetailsPageData(userId);

  if (isLoading) {
    return (
      <section className={styles["user-details"]}>
        <BodyText>Loading user...</BodyText>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles["user-details"]}>
        <BodyText>User not found.</BodyText>
        <BackLink href="/users" label="Back to Users" />
      </section>
    );
  }

  return (
    <section className={styles["user-details"]}>
      <BackLink
        href="/users"
        label="Back to Users"
        className={styles["user-details__back-link"]}
      />
      <UserDetailsTopHeader />
      <section className={styles["user-overview-panel"]}>
        <UserSummaryCard />
        <UserDetailsTabs />
      </section>
      <UserDetailsTabContent />
    </section>
  );
}
