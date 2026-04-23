"use client";

import Link from "next/link";
import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { useUserQuery } from "@/app/(dashboard)/users/_hooks/use-user-query";
import styles from "@/app/(dashboard)/users/styles/user-details-view.module.scss";

type UserDetailsViewProps = {
  userId: string;
};

export function UserDetailsView({ userId }: UserDetailsViewProps) {
  const { data: user, isLoading, isError } = useUserQuery(userId);

  if (isLoading) {
    return (
      <section className={styles["user-details"]}>
        <BodyText>Loading user...</BodyText>
      </section>
    );
  }

  if (isError || !user) {
    return (
      <section className={styles["user-details"]}>
        <BodyText>User not found.</BodyText>
        <Link href="/users">Back to users</Link>
      </section>
    );
  }

  return (
    <section className={styles["user-details"]}>
      <header className={styles["user-details__header"]}>
        <HeadingText
          level="h2"
          size="xl"
          className={styles["user-details__title"]}
        >
          {user.username}
        </HeadingText>
        <Link href="/users" className={styles["user-details__back"]}>
          Back to users
        </Link>
      </header>

      <div className={styles["user-details__grid"]}>
        <article className={styles["user-details__card"]}>
          <HeadingText level="h3" size="md">
            Personal Information
          </HeadingText>
          <BodyText>Full Name: {user.guarantor.fullName}</BodyText>
          <BodyText>Email: {user.email}</BodyText>
          <BodyText>Phone: {user.phoneNumber}</BodyText>
          <BodyText>BVN: {user.bvn}</BodyText>
        </article>

        <article className={styles["user-details__card"]}>
          <HeadingText level="h3" size="md">
            Education and Employment
          </HeadingText>
          <BodyText>Level: {user.educationLevel}</BodyText>
          <BodyText>Status: {user.employmentStatus}</BodyText>
          <BodyText>Sector: {user.sector}</BodyText>
          <BodyText>
            Income: NGN {user.monthlyIncome[0]} - NGN {user.monthlyIncome[1]}
          </BodyText>
        </article>

        <article className={styles["user-details__card"]}>
          <HeadingText level="h3" size="md">
            Socials
          </HeadingText>
          <BodyText>Twitter: {user.twitter}</BodyText>
          <BodyText>Facebook: {user.facebook}</BodyText>
          <BodyText>Instagram: {user.instagram}</BodyText>
          <BodyText>Loan Repayment: NGN {user.loanRepayment}</BodyText>
        </article>
      </div>
    </section>
  );
}
