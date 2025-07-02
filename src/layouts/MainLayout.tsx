import { Outlet } from "react-router";
import styles from "./main-layout.module.scss";
import Header from "@components/header";
import Sidebar from "@components/sidebar/Sidebar";
import SidebarContext, {
  SidebarProvider,
} from "../state-management/context/SidebarContext";
import { useContext } from "react";

const MainLayoutContent = () => {
  const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);

  return (
    <div className={styles.mainLayout}>
      {/* header */}
      <header className={styles.mainLayout__header}>
        <Header />
      </header>

      <div className={styles.mainLayout__belowSection}>
        {/* Overlay for mobile */}
        <div
          className={`${styles.mainLayout__overlay} ${
            sidebarOpen ? styles.show : ""
          }`}
          onClick={toggleSidebar}
        />

        {/* sidebar */}
        <aside
          className={`${styles.mainLayout__aside} ${
            sidebarOpen ? styles["show-mobile"] : styles.hide
          }`}
        >
          <Sidebar />
        </aside>

        {/* pages */}
        <main className={styles.mainLayout__main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const MainLayout = () => {
  return (
    <SidebarProvider>
      <MainLayoutContent />
    </SidebarProvider>
  );
};

export default MainLayout;
