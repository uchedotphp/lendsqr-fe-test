"use client";

import { UserDetailsSection } from "@/app/(dashboard)/users/_components/user-details-section";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";
import styles from "@/app/(dashboard)/users/styles/user-details-view.module.scss";

function formatCurrency(amount: string): string {
  const value = Number.parseFloat(amount);
  if (Number.isNaN(value)) {
    return amount;
  }

  return `N${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatNumber(value: string): string {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) {
    return value;
  }

  return parsed.toLocaleString("en-NG");
}

export function UserGeneralDetailsTab() {
  const user = useUsersStore((state) => state.selectedUser);
  const userDetails = useUsersStore((state) => state.userDetails);

  if (!user) {
    return null;
  }

  const guarantors =
    user.guarantors && user.guarantors.length > 0
      ? user.guarantors
      : [user.guarantor];

  return (
    <article className={styles["general-details"]}>
      <UserDetailsSection
        title="Personal Information"
        fields={[
          {
            label: "Full Name",
            value: userDetails?.fullName ?? user.username.replaceAll(".", " "),
          },
          { label: "Phone Number", value: user.phoneNumber },
          { label: "Email Address", value: user.email },
          { label: "BVN", value: user.bvn },
          { label: "Gender", value: user.gender },
          { label: "Marital Status", value: user.maritalStatus },
          { label: "Children", value: user.children },
          { label: "Type of Residence", value: user.residenceType },
        ]}
      />

      <UserDetailsSection
        title="Education and Employment"
        className={styles["general-details__section"]}
        fields={[
          { label: "Level of Education", value: user.educationLevel },
          { label: "Employment Status", value: user.employmentStatus },
          { label: "Sector of Employment", value: user.sector },
          { label: "Duration of Employment", value: user.duration },
          { label: "Office Email", value: user.officeEmail },
          {
            label: "Monthly Income",
            value: `${formatCurrency(user.monthlyIncome[0])}- ${formatCurrency(user.monthlyIncome[1])}`,
          },
          { label: "Loan Repayment", value: formatNumber(user.loanRepayment) },
        ]}
      />

      <UserDetailsSection
        title="Socials"
        className={styles["general-details__section"]}
        fields={[
          { label: "Twitter", value: user.twitter },
          { label: "Facebook", value: user.facebook },
          { label: "Instagram", value: user.instagram },
        ]}
      />

      {guarantors.map((guarantor, index) => (
        <UserDetailsSection
          key={`${guarantor.fullName}-${guarantor.phoneNumber}-${index}`}
          title={index === 0 ? "Guarantor" : ""}
          className={styles["general-details__section"]}
          fields={[
            { label: "Full Name", value: guarantor.fullName },
            { label: "Phone Number", value: guarantor.phoneNumber },
            { label: "Email Address", value: guarantor.email },
            { label: "Relationship", value: guarantor.relationship },
          ]}
        />
      ))}
    </article>
  );
}
