import ActivateUser from "@assets/icons/activate-user.svg";
import DeleteUser from "@assets/icons/delete-user.svg";
import EyeIcon from "@assets/icons/eye-icon.svg";
import styles from "./table.module.scss";
import { Link } from "react-router";

interface MenuProps {
  id: string;
  status: string;
}

const Menu = ({ id, status }: MenuProps) => {
  const navs = [
    {
      icon: EyeIcon,
      label: "view details",
      link: `/users/${id}/details`,
    },
    ...(status !== "blacklisted"
      ? [
          {
            icon: DeleteUser,
            label: "blacklist user",
            link: "#",
          },
        ]
      : []),
    ...(status !== "active"
      ? [
          {
            icon: ActivateUser,
            label: "activate user",
            link: "#",
          },
        ]
      : []),
  ];

  return (
    <ul>
      {navs.map(({ icon, label, link }) => (
        <li key={id + label}>
          <Link
            to={link}
            onClick={() => console.log("clicked")}
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
