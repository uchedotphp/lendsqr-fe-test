import { NavLink } from "react-router";
import styles from "./tabs.module.scss";

interface TabsProps {
  id: string;
  tabs: {
    label: string;
    value: string;
  }[];
}

const Tabs = ({ tabs, id }: TabsProps) => {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ value, label }) => (
        <NavLink
          key={value}
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? styles.tabs__item__active
              : styles.tabs__item
          }
          to={`/users/${id}/${value}`}
        >
          <p>{label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Tabs;
