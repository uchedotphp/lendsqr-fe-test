"use client";

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import styles from "@/app/_components/back-link/back-link.module.scss";
import { cn } from "@/app/_lib/utils/cn";

type BackLinkProps = {
  href: string;
  label?: string;
  className?: string;
};

export function BackLink({ href, label = "Back", className }: BackLinkProps) {
  return (
    <Link href={href} className={cn(styles.backLink, className)}>
      <HiArrowLeft aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
