"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiArrowsRightLeft,
  HiBars3BottomLeft,
  HiClipboardDocumentList,
  HiCog6Tooth,
  HiCog8Tooth,
  HiHome,
  HiOutlineArrowPathRoundedSquare,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBanknotes,
  HiOutlineBuildingLibrary,
  HiOutlineBuildingOffice2,
  HiOutlineChartBar,
  HiOutlineChevronDown,
  HiOutlineCreditCard,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Button } from "@/app/_components/button/button";
import styles from "@/app/_components/sidebar/sidebar.module.scss";
import { apiClient } from "@/app/_lib/api/client";
import { routes } from "@/app/_lib/constants/routes";
import { useAuthStore } from "@/app/(auth)/_services/auth-store";

const sidebarSections = [
  {
    title: "CUSTOMERS",
    items: [
      { label: "Users", href: routes.users, icon: HiOutlineUsers },
      { label: "Guarantors", href: "#", icon: HiOutlineUserGroup },
      { label: "Loans", href: "#", icon: HiOutlineBanknotes },
      { label: "Decision Models", href: "#", icon: HiOutlineScale },
      { label: "Savings", href: "#", icon: HiOutlineBuildingLibrary },
      { label: "Loan Requests", href: "#", icon: HiOutlineCurrencyDollar },
      { label: "Whitelist", href: "#", icon: HiOutlineUserPlus },
      { label: "Karma", href: "#", icon: HiOutlineShieldCheck },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { label: "Organization", href: "#", icon: HiOutlineBuildingOffice2 },
      { label: "Loan Products", href: "#", icon: HiOutlineBanknotes },
      { label: "Savings Products", href: "#", icon: HiOutlineBuildingLibrary },
      { label: "Fees and Charges", href: "#", icon: HiOutlineCreditCard },
      { label: "Transactions", href: "#", icon: HiArrowsRightLeft },
      { label: "Services", href: "#", icon: HiOutlineArrowPathRoundedSquare },
      { label: "Service Account", href: "#", icon: HiOutlineUsers },
      { label: "Settlements", href: "#", icon: HiOutlineDocumentText },
      { label: "Reports", href: "#", icon: HiOutlineChartBar },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Preferences", href: "#", icon: HiBars3BottomLeft },
      { label: "Fees and Pricing", href: "#", icon: HiCog8Tooth },
      { label: "Audit Logs", href: "#", icon: HiClipboardDocumentList },
      { label: "Systems Messages", href: "#", icon: HiCog6Tooth },
    ],
  },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      logout();
      onClose();
      router.replace(routes.login);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={styles.sidebar__backdrop}
        data-open={isOpen}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <aside
        id="dashboard-sidebar"
        className={styles.sidebar}
        data-open={isOpen}
      >
        <nav className={styles.sidebar__nav} aria-label="Sidebar navigation">
          <Button
            variant="ghost"
            size="sm"
            className={styles.sidebar__organizationSwitcher}
          >
            <HiOutlineBuildingOffice2 />
            <span>Switch Organization</span>
            <HiOutlineChevronDown />
          </Button>

          <Link
            href={routes.dashboard}
            className={styles.sidebar__link}
            data-active={pathname === routes.dashboard}
            onClick={onClose}
          >
            <HiHome />
            <span>Dashboard</span>
          </Link>

          {sidebarSections.map((section) => (
            <section key={section.title} className={styles.sidebar__section}>
              <h2 className={styles.sidebar__sectionTitle}>{section.title}</h2>
              <div className={styles.sidebar__sectionItems}>
                {section.items.map((item) => {
                  const isActive = item.href ? pathname === item.href : false;
                  const Icon = item.icon;

                  if (!item.href) {
                    return (
                      <span
                        key={item.label}
                        className={styles.sidebar__link}
                        data-active={false}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </span>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={styles.sidebar__link}
                      data-active={isActive}
                      onClick={onClose}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}

          <section className={styles.sidebar__footer}>
            <Button
              variant="ghost"
              size="sm"
              className={styles.sidebar__logoutButton}
              onClick={handleLogout}
            >
              <HiOutlineArrowRightOnRectangle />
              <span>Logout</span>
            </Button>
            <small className={styles.sidebar__version}>v1.2.0</small>
          </section>
        </nav>
      </aside>
    </>
  );
}
