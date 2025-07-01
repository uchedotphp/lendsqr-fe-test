import styles from "./auth-layout.module.scss";
import AdsImg from "@assets/images/pablo-sign-in.svg";
import Logo from "@components/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className={styles.auth__layout}>
      <div className={styles.auth__container}>
        <div className={`${styles["auth__ads-area"]} hide show-desktop`}>
          <div>
            <div className={styles["auth__ads-area__logo"]}>
              <Logo />
            </div>
            <span>
              <img src={AdsImg} alt="a random illustration" />
            </span>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
