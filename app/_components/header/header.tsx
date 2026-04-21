"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Button } from "@/app/_components/button/button";
import styles from "@/app/_components/header/header.module.scss";
import { HeaderSearch } from "@/app/_components/header/header-search";
import { ProfileMenu } from "@/app/_components/header/profile-menu";
import { routes } from "@/app/_lib/constants/routes";

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Button
          variant="ghost"
          size="sm"
          className={styles.header__menuToggle}
          aria-label={
            isSidebarOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-controls="dashboard-sidebar"
          aria-expanded={isSidebarOpen}
          onClick={onToggleSidebar}
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </Button>
        <Link href={routes.dashboard} className={styles.header__logoLink}>
          <Image
            src="/lendsqr-logo.svg"
            alt="Lendsqr logo"
            width={144}
            height={30}
            priority
            className={styles.header__logo}
          />
        </Link>

        <HeaderSearch />
      </div>

      <div className={styles.header__right}>
        <Link
          href="#"
          className={styles.header__docs}
          target="_blank"
          rel="noreferrer"
        >
          Docs
        </Link>
        <Button
          variant="ghost"
          className={styles.header__iconButton}
          aria-label="Notifications"
        >
          <IoMdNotificationsOutline className={styles.header__notificationsIconButton} />
        </Button>

        <ProfileMenu />
      </div>
    </header>
  );
}
