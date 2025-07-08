import { useState, useRef, useEffect, type ReactNode } from "react";
import styles from "./FlyoutMenu.module.scss";
import Button from "@components/ui/buttons/Button";

interface FlyoutMenuProps {
  buttonChildren: ReactNode;
  menuChildren: ReactNode;
  buttonClass?: string;
  menuClass?: string;
  menuPosition?: "left" | "right" | "center";
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const FlyoutMenu = ({
  buttonChildren,
  menuChildren,
  menuClass,
  buttonClass,
  menuPosition = "center",
  isOpen,
  onOpenChange,
}: FlyoutMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    onOpenChange?.(newState);
  };

  // Update internal state when controlled from outside
  useEffect(() => {
    if (isOpen !== undefined) {
      setMenuOpen(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!menuRef.current) return;

      // Click outside the component
      if (!menuRef.current.contains(target)) {
        setMenuOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onOpenChange]);

  return (
    <div
      className={`${styles.menu}`}
      ref={menuRef}
    >
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
        } ${
          menuPosition === "left"
            ? styles.menu__left
            : menuPosition === "right"
            ? styles.menu__right
            : menuPosition === "center"
            ? styles.menu__center
            : ""
        }`}
      >
        {menuChildren}
      </section>
    </div>
  );
};

export default FlyoutMenu;
