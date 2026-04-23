"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/app/_components/header/header";
import { Sidebar } from "@/app/_components/sidebar/sidebar";
import { useAuthStore } from "@/app/(auth)/_services/auth-store";
import styles from "@/app/(dashboard)/styles/dashboard-layout.module.scss";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles["dashboard-layout"]}>
      <a href="#main-content" className={styles["dashboard-layout__skip-link"]}>
        Skip to main content
      </a>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
      />
      <div className={styles["dashboard-layout__body"]}>
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => {
            setIsSidebarOpen((prev) => !prev);
          }}
        />
        <main id="main-content" className={styles["dashboard-layout__content"]}>
          {children}
        </main>
      </div>
    </div>
  );
}
