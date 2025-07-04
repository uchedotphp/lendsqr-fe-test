import pageStyles from "./pages.module.scss";
import ActivationButtons from "@components/user/activationButtons"
import starEmpty from "@assets/icons/star-empty.svg";
import starFilled from "@assets/icons/star-filled.svg";
import userImage from "@assets/icons/user-avatar.svg";
import { Outlet, useParams, Navigate } from "react-router";
import NotFound from "./notFound/NotFound";
import Goback from "@components/goback/GoBack";
import useUser from "@hooks/useUser";
import useAccountSummary from "@hooks/useAccountSummary";
import { useUserContext } from "@hooks/useUserContext";
import { useEffect } from "react";
import Loader from "@components/loader";
import Tabs from "@components/user/tabs";

const User = () => {
  const { tab, userId } = useParams();
  const { data: user, loading: userLoading, error: userError } = useUser(userId);
  const { data: accountSummary, loading: accountLoading, error: accountError } = useAccountSummary(userId);
  const { setUser, setLoading, setError } = useUserContext();

  const tabs = [
    {
      label: "General Details",
      value: "details",
    },
    {
      label: "Documents",
      value: "documents",
    },
    {
      label: "Bank Details",
      value: "bank",
    },
    {
      label: "Loans",
      value: "loans",
    },
    {
      label: "Savings",
      value: "savings",
    },
    {
      label: "App and System",
      value: "app-and-system",
    },
  ];

  // Update context with user data
  useEffect(() => {
    setUser(user);
    setLoading(userLoading);
    setError(userError);
  }, [user, userLoading, userError, setUser, setLoading, setError]);

  if (!tab) {
    return <Navigate to={`/users/${userId}/${tabs[0].value}`} replace />;
  }

  if (userLoading || accountLoading) {
    return <Loader />;
  }

  // Validate the current tab
  const isValidTab = tabs.some((tabItem) => tabItem.value === tab);
  if (!isValidTab || !userId) {
    return (
      <NotFound
        message={`Stop trying to hack the system my guy`}
        showBackButton={true}
      />
    );
  }

  if (userError || accountError) {
    return (
      <NotFound
        message={userError || accountError || "User not found"}
        showBackButton={true}
      />
    );
  }

  return (
    <div className={pageStyles.user}>
      <div>
        <Goback label="Back to User" />
      </div>

      <section
        className={`${pageStyles["pages__user__header"]} ${pageStyles.pages__section}`}
      >
        <h2 className={pageStyles.pages__title}>User details</h2>
        <div>
          <ActivationButtons status={user?.status || "pending"} />
        </div>
      </section>

      <div
        className={`${pageStyles["pages__user__profile"]} ${pageStyles.pages__section}`}
      >
        <div className={pageStyles["pages__user__profile__header"]}>
          <div className={pageStyles["pages__user__profile__header__user"]}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img src={userImage} alt="user" />
              <div>
                <p
                  className={
                    pageStyles["pages__user__profile__header__user__name"]
                  }
                >
                  {user?.username}
                </p>
                <p
                  className={pageStyles["pages__user__profile__header__user__id"]}
                >
                  {user?.id}
                </p>
              </div>
            </div>

            <div>
              <p className={pageStyles["pages__user__profile__header__tier"]}>
                User's Tier
              </p>
              <div
                className={pageStyles["pages__user__profile__header__tier__stars"]}
              >
                <img src={starFilled} alt="star" />
                <img src={starEmpty} alt="empty star" />
                <img src={starEmpty} alt="empty star" />
              </div>
            </div>
            
            <div>
              <p className={pageStyles["pages__user__profile__header__balance"]}>
                {accountSummary?.balance}
              </p>
              <p className={pageStyles["pages__user__profile__header__account"]}>
                {accountSummary?.accountNumber}/{accountSummary?.bankName}
              </p>
            </div>
          </div>
        </div>

        <div className={pageStyles["pages__user__profile__tabs"]}>
          <Tabs tabs={tabs} id={userId as string} />
        </div>
    </div>

      <section
        className={`${pageStyles["pages__user__content"]} ${pageStyles.pages__section}`}
      >
        <Outlet />
      </section>
    </div>
  );
};

export default User;
