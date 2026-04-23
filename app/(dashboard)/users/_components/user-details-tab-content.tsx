"use client";

import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { UserGeneralDetailsTab } from "@/app/(dashboard)/users/_components/user-general-details-tab";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";
import styles from "@/app/(dashboard)/users/styles/user-details-view.module.scss";

export function UserDetailsTabContent() {
  const activeTab = useUsersStore((state) => state.activeUserDetailsTab);

  return (
    <section className={styles["user-details__tab-content"]}>
      {activeTab === "General Details" ? (
        <UserGeneralDetailsTab />
      ) : (
        <>
          <HeadingText
            level="h3"
            size="md"
            className={styles["user-details__tab-content-title"]}
          >
            {activeTab}
          </HeadingText>
          <BodyText>{`${activeTab} content will be provided in a later phase.`}</BodyText>
        </>
      )}
    </section>
  );
}
