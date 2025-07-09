import Logo from "@components/Logo";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router";
// import SearchIcon from "@assets/icons/search.svg";
import Avatar from "@components/ui/avatar/Avatar";
import { useContext } from "react";
import ProfileContext from "../../state-management/context/profileContext";
import MobileMenu from "./MobileMenu";
import Notifications from "./Notifications";
import FlyoutMenu from "@components/flyoutMenu/FlyoutMenu";
import { localStorage } from "@utils/helpers";
// import InputGroup from "@components/ui/inputs/InputGroup";
// import { useForm } from "react-hook-form";

const Header = () => {
  const { profile } = useContext(ProfileContext);
  const firstName = profile?.firstName || "Guest";
  const navigate = useNavigate();

  // const { control, handleSubmit } = useForm<Record<string, string>>({
  //   mode: "onChange",
  //   defaultValues: { query: "" },
  // });

  // const onSubmit = (data: Record<string, string>) => {
  //   // handle search logic here
  //   console.log(data.query);
  // };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  return (
    <div className={styles.header}>
      <section className={styles.header__left}>
        <div className={`${styles.header__mobile__menu} hide-desktop`}>
          <MobileMenu />
        </div>
        <div className={styles.header__logo}>
          <Logo />
        </div>

        {/* <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.header__search} hide show-desktop`}
        >
          <InputGroup
            control={control}
            name="query"
            placeholder="Search for anything"
            className={`${styles.header__search__input}`}
            rules={{ required: "Please enter a search term" }}
          >
            <button
              type="submit"
              style={{
                background: "#2EC4D6",
                border: "none",
                height: "100%",
                width: 70,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0 20px 20px 0",
                cursor: "pointer",
              }}
            >
              <img
                src={SearchIcon}
                alt="search"
                style={{ width: 24, height: 24 }}
              />
            </button>
          </InputGroup>
        </form> */}
      </section>

      <section className={styles.header__right}>
        <Link to="#" className={`${styles.header__docs} hide show-tablet`}>
          Docs
        </Link>

        <span className={`${styles.header__notifications}`}>
          <Notifications />
        </span>

        <section>
          <FlyoutMenu
            buttonChildren={<Avatar firstName={firstName} />}
            menuChildren={
              <div
                onClick={handleLogout}
                role="button"
                className={styles.header__logout}
              >
                Logout
              </div>
            }
          />
        </section>
      </section>
    </div>
  );
};

export default Header;
