import Logo from "@components/Logo";
import styles from "./header.module.scss";
import { Link } from "react-router";
import InputWithPrefix from "@components/ui/inputs/InputWithPrefix";
import SearchIcon from "@assets/icons/search.svg";
import Avatar from "@components/ui/avatar/Avatar";
// import { useContext } from "react";
// import ProfileContext from "state-management/contexts/profileContext";
import MobileMenu from "./MobileMenu";
import Notifications from "./Notifications";

const Header = () => {
  // const context = useContext(ProfileContext);
  const firstName = "Guest"; // Fallback value for firstName

  return (
    <div className={styles.header}>
      <section className={styles.header__left}>
        <div className={`${styles.header__mobile__menu} hide-desktop`}>
          <MobileMenu />
        </div>
        <div className={styles.header__logo}>
          <Logo />
        </div>
        <div className={`${styles.header__search} hide show-desktop`}>
          <InputWithPrefix
            placeholder="Search for anything"
            name="search"
            type="text"
            className={styles.header__search__input}
          >
            <span style={{ backgroundColor: "red" }}>
              <img src={SearchIcon} alt="search" />
            </span>
          </InputWithPrefix>
        </div>
      </section>

      <section className={styles.header__right}>
        <Link to="#" className={`${styles.header__docs} hide show-tablet`}>
          Docs
        </Link>

        <span className={`${styles.header__notifications}`}>
          <Notifications />
        </span>

        <section>
          <Avatar firstName={firstName} />
        </section>
      </section>
    </div>
  );
};

export default Header;
