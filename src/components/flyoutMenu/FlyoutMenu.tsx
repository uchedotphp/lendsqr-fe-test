import { useState, useRef, useEffect, type ReactNode } from "react";
import styles from "./FlyoutMenu.module.scss";
import Button from "@components/ui/buttons/Button";

interface FlyoutMenuProps {
  buttonChildren: ReactNode;
  menuChildren: ReactNode;
  buttonClass?: string;
  menuClass?: string;
}

const FlyoutMenu = ({
  buttonChildren,
  menuChildren,
  menuClass,
  buttonClass,
}: FlyoutMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!menuRef.current) return;

      // Click outside the component
      if (!menuRef.current.contains(target)) {
        setMenuOpen(false);
        return;
      }

      // Click inside the flyout menu on a button
      const isInsideMenu = target.closest(`.${styles.menu__flyoutmenu}`);
      if (isInsideMenu) {
        setTimeout(() => {
          setMenuOpen(false);
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuOpen]);

  return (
    <div className={styles.menu} ref={menuRef}>
      <Button
        onClick={toggleMenu}
        className={`${styles.menu__button} ${buttonClass} btn--flat`}
        aria-label="Toggle menu"
      >
        {buttonChildren}
      </Button>
      <section
        className={`${styles.menu__flyoutmenu} ${menuClass} ${
          menuOpen ? "show" : "hide"
        }`}
      >
        {menuChildren}
      </section>
    </div>
  );
};

export default FlyoutMenu;
