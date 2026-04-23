"use client";

import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import styles from "@/app/(dashboard)/users/styles/user-details-view.module.scss";

type UserDetailsField = {
  label: string;
  value: string;
};

type UserDetailsSectionProps = {
  title: string;
  fields: UserDetailsField[];
  className?: string;
};

export function UserDetailsSection({
  title,
  fields,
  className,
}: UserDetailsSectionProps) {
  return (
    <section className={className}>
      <HeadingText
        level="h3"
        size="md"
        className={styles["user-details-section__title"]}
      >
        {title}
      </HeadingText>

      <dl className={styles["user-details-section__grid"]}>
        {fields.map((field) => (
          <div
            key={field.label}
            className={styles["user-details-section__item"]}
          >
            <dt className={styles["user-details-section__label"]}>
              {field.label}
            </dt>
            <dd className={styles["user-details-section__value"]}>
              <BodyText>{field.value}</BodyText>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
