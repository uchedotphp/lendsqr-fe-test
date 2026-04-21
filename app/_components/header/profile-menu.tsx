"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@/app/_components/button/button";
import styles from "@/app/_components/header/header.module.scss";
import { useAuthStore } from "@/app/(auth)/_services/auth-store";
import { routes } from "@/app/_lib/constants/routes";

export function ProfileMenu() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={styles.header__profileMenu} ref={profileMenuRef}>
      <Button
        variant="ghost"
        size="sm"
        className={styles.header__profile}
        aria-haspopup="menu"
        aria-expanded={isProfileMenuOpen}
        aria-controls="profile-dropdown-menu"
        onClick={() => setIsProfileMenuOpen((prev) => !prev)}
      >
        <Image
          src="/profile-image.png"
          alt="Adedeji profile"
          width={48}
          height={48}
          className={styles.header__avatar}
        />
        {/* TODO: Replace with user name */}
        <span>Adedeji</span>
        <IoMdArrowDropdown className={styles.header__arrowDropdown} />
      </Button>

      {isProfileMenuOpen ? (
        <div
          id="profile-dropdown-menu"
          role="menu"
          className={styles.header__dropdown}
        >
          <Button
            variant="ghost"
            size="sm"
            role="menuitem"
            className={styles.header__dropdownItem}
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              logout();
              router.replace(routes.login);
            }}
          >
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  );
}
