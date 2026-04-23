"use client";

import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { UsersKpiSection } from "@/app/(dashboard)/users/_components/users-kpi-section";
import { UsersTable } from "@/app/(dashboard)/users/_components/users-table";
import { useUsersPageData } from "@/app/(dashboard)/users/_hooks/use-users-page-data";
import styles from "@/app/(dashboard)/users/styles/users-page-view.module.scss";

export function UsersPageView() {
  const { isLoading, isError } = useUsersPageData();

  return (
    <section className={styles["users-page"]}>
      <header>
        <HeadingText
          level="h2"
          size="xl"
          className={styles["users-page__title"]}
        >
          Users
        </HeadingText>
      </header>

      {isLoading ? (
        <BodyText>Loading users...</BodyText>
      ) : isError ? (
        <BodyText>Unable to load users at the moment.</BodyText>
      ) : (
        <>
          <UsersKpiSection />
          <UsersTable />
        </>
      )}
    </section>
  );
}
