import ActivateUser from "@assets/icons/activate-user.svg";
import DeleteUser from "@assets/icons/delete-user.svg";
import EyeIcon from "@assets/icons/eye-icon.svg";
import styles from "./table.module.scss";
import { Link } from "react-router";

interface MenuProps {
  id: string;
}

const Menu = ({ id }: MenuProps) => {
  const navs = [
    {
      icon: EyeIcon,
      label: "view details",
      link: "",
    },
    {
      icon: DeleteUser,
      label: "blacklist user",
      link: "",
    },
    {
      icon: ActivateUser,
      label: "activate user",
      link: "",
    },
  ];
  return (
    <ul>
      {navs.map(({ icon, label }) => (
        <li key={label}>
          <Link
            to={`/users/${id}/details`}
            onClick={() => console.log("clicked")}
            key={label}
            className={styles["users-table__menu"]}
          >
            <img src={icon} alt={`${label} icon`} />
            <span className={styles["users-table__menu__label"]}>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
