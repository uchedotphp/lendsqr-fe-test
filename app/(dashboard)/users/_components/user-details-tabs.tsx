"use client";

import {
  USER_DETAILS_TABS,
  useUsersStore,
} from "@/app/(dashboard)/users/_services/users-store";
import styles from "@/app/(dashboard)/users/styles/user-details-view.module.scss";

export function UserDetailsTabs() {
  const activeTab = useUsersStore((state) => state.activeUserDetailsTab);
  const setActiveUserDetailsTab = useUsersStore(
    (state) => state.setActiveUserDetailsTab,
  );

  return (
    <section className={styles["user-tabs"]} aria-label="User details tabs">
      {USER_DETAILS_TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          className={styles["user-tabs__tab"]}
          data-active={activeTab === tab}
          onClick={() => {
            setActiveUserDetailsTab(tab);
          }}
        >
          {tab}
        </button>
      ))}
    </section>
  );
}
