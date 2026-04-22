import { HeadingText } from "@/app/_components/typography/heading-text";
import { UsersKpiSection } from "@/app/(dashboard)/users/_components/users-kpi-section";
import styles from "@/app/(dashboard)/users/styles/users-page-view.module.scss";

export function UsersPageView() {
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

      <UsersKpiSection />
    </section>
  );
}
