import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import styles from "@/app/(dashboard)/styles/dashboard-cards.module.scss";

const cards = [
  { title: "Users", value: "2,453" },
  { title: "Active Users", value: "2,102" },
  { title: "Loans", value: "12,453" },
  { title: "Savings", value: "102,453" },
];

export function DashboardCards() {
  return (
    <section className={styles["dashboard-cards"]}>
      <HeadingText
        level="h2"
        size="xl"
        className={styles["dashboard-cards__title"]}
      >
        Dashboard
      </HeadingText>
      <div className={styles["dashboard-cards__grid"]}>
        {cards.map((card) => (
          <article key={card.title} className={styles["dashboard-cards__item"]}>
            <BodyText className={styles["dashboard-cards__label"]} tone="muted">
              {card.title}
            </BodyText>
            <BodyText className={styles["dashboard-cards__value"]}>
              {card.value}
            </BodyText>
          </article>
        ))}
      </div>
    </section>
  );
}
