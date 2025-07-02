import { NavLink } from "react-router";
import styles from "./navlink.module.scss";
import Icon from "./Icon";

import type { IconKeys } from "./Icon";

interface NavlinkProps {
  path: string;
  icon: IconKeys;
  label: string;
  slug: string;
}

const Navlink = ({ path, icon, label, slug }: NavlinkProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${styles.navlink} ${isActive ? `${styles["navlink--active"]}` : ""}`
      }
    >
      <Icon menuIcon={icon} slug={slug} className={styles.navlink__icon} />
      <span>{label}</span>
    </NavLink>
  );
};

export default Navlink;
