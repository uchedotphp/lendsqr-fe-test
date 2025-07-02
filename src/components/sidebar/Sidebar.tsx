import { navlinks } from "./data";
import styles from "./sidebar.module.scss";
import BriefcaseIcon from "@assets/icons/organization.svg";
import ChevronDown from "@assets/icons/chevronDown.svg";
import Navlink from "./Navlink";

const Sidebar = () => {
  type IconType =
    | "home"
    | "users"
    | "guarantors"
    | "loans"
    | "decision-models"
    | "savings"
    | "loan-requests"
    | "whitelist"
    | "karma"
    | "organization"
    | "loan-products"
    | "savings-products";
    
  return (
    <nav className={styles.sidebar}>
      <section className={styles.sidebar__switch}>
        <img src={BriefcaseIcon} alt="briefcase icon" />
        <span className={styles.sidebar__switch__label}>
          Switch Organization
        </span>
        <img src={ChevronDown} alt="down carrot icon" />
      </section>

      <ul className={styles.sidebar__menu}>
        {navlinks.map((item, index) => (
          <li key={index} className={styles["sidebar__menu-item"]}>
            {item.label && (
              <p className={styles["sidebar__menu-item__label"]}>
                {item.label}
              </p>
            )}
            <ul>
              {item.items.map(({ path, icon, label, slug }, subIndex) => (
                <li key={subIndex}>
                  <Navlink
                    path={path}
                    icon={icon as IconType}
                    label={label}
                    slug={slug}
                    key={subIndex}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
