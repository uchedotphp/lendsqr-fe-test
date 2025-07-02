import type { ReactNode } from "react";
import styles from "./badge.module.scss";
import type { StatusSchemaType } from "schemas/Schema";

interface BadgeProps {
  status?: StatusSchemaType;
  children?: ReactNode;
}
const Badge = ({ children, status }: BadgeProps) => {
  return (
    <span
      className={`${styles.badge} ${styles.badge__status} ${
        styles[`badge__status__${status}`]
      }`}
    >
      {children || status}
    </span>
  );
};

export default Badge;
