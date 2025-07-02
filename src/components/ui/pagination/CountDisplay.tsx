import styles from "./pagination.module.scss";
import Button from "@components/ui/buttons/Button";
import ChevronDown from "@assets/icons/chevronDown.svg";
import { useState, useContext } from "react";
import UsersTableContext from "../../../state-management/context/usersTableContext";

interface CountDisplayProps {
  recordsCount: number;
}

const CountDisplay = ({ recordsCount }: CountDisplayProps) => {
  const [isMenuOpen, openMenu] = useState(false);
  const { perPage, updateQuery } = useContext(UsersTableContext);
  const pages = ["10", "20", "50", "100"];

  const handleSelection = (count: number) => {
    updateQuery({ perPage: count });
    openMenu(false);
  };

  return (
    <div className={styles["count-display"]}>
      <span>Showing</span>
      <span style={{ position: "relative" }}>
        <Button
          onClick={() => openMenu(!isMenuOpen)}
          className={styles["count-display__switch"]}
        >
          <span>{perPage}</span>
          <img src={ChevronDown} alt="chevron down icon" />
        </Button>
        {isMenuOpen && (
          <div className={styles["count-display__menu"]}>
            <ul>
              {pages.map((count) => (
                <li
                  key={count}
                  className={styles["count-display__menu__item"]}
                  onClick={() => handleSelection(parseInt(count))}
                >
                  <Button className={styles["count-display__button"]}>
                    {count}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </span>
      <span>out of {recordsCount}</span>
    </div>
  );
};

export default CountDisplay;
