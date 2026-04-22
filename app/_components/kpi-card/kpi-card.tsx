import type { IconType } from "react-icons";
import styles from "@/app/_components/kpi-card/kpi-card.module.scss";
import { cn } from "@/app/_lib/utils/cn";

export type KpiCardVariant = "users" | "activeUsers" | "loans" | "savings";

export type KpiCardProps = {
  label: string;
  value: number;
  icon: IconType;
  variant: KpiCardVariant;
  className?: string;
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  variant,
  className,
}: KpiCardProps) {
  const formatted = value.toLocaleString("en-US");

  return (
    <article className={cn(styles.root, styles[`root--${variant}`], className)}>
      <div className={styles.iconWrap} aria-hidden>
        <Icon className={styles.icon} />
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{formatted}</p>
    </article>
  );
}
