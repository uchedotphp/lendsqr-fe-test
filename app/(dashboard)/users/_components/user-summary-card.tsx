"use client";

import { HiOutlineUser } from "react-icons/hi2";
import { LiaStarSolid } from "react-icons/lia";
import { BodyText } from "@/app/_components/typography/body-text";
import { HeadingText } from "@/app/_components/typography/heading-text";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";
import styles from "@/app/(dashboard)/users/styles/user-details-view.module.scss";

export function UserSummaryCard() {
  const userDetails = useUsersStore((state) => state.userDetails);

  if (!userDetails) {
    return null;
  }

  return (
    <article className={styles["user-summary"]}>
      <div className={styles["user-summary__identity"]}>
        <div className={styles["user-summary__avatar"]}>
          <HiOutlineUser aria-hidden="true" />
        </div>
        <div className={styles["user-summary__meta"]}>
          <HeadingText
            level="h3"
            size="lg"
            className={styles["user-summary__name"]}
          >
            {userDetails.fullName}
          </HeadingText>
          <BodyText className={styles["user-summary__code"]}>
            {userDetails.userCode}
          </BodyText>
        </div>
      </div>

      <div className={styles["user-summary__tier"]}>
        <BodyText className={styles["user-summary__tier-label"]}>
          User&apos;s Tier
        </BodyText>
        <div className={styles["user-summary__stars"]}>
          {[1, 2, 3].map((level) => (
            <LiaStarSolid
              key={level}
              data-active={level <= userDetails.tier}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className={styles["user-summary__account"]}>
        <HeadingText
          level="h3"
          size="lg"
          className={styles["user-summary__balance"]}
        >
          {userDetails.accountBalance}
        </HeadingText>
        <BodyText className={styles["user-summary__account-id"]}>
          {userDetails.accountNumber}/{userDetails.bankName}
        </BodyText>
      </div>
    </article>
  );
}
