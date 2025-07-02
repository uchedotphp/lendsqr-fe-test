import pageStyles from "../pages.module.scss";
import Kpi from "@components/kpi/Kpi";
import Table from "@components/users/table";
import useUsersData from "@hooks/useUsers";
import UsersIcon from "@assets/icons/kpi-users.svg";
import ActiveUsersIcon from "@assets/icons/kpi-active-users.svg";
import UsersWithLoansIcon from "@assets/icons/kpi-users-with-loans.svg";
import UsersWithSavingsIcon from "@assets/icons/kpi-users-with-savings.svg";
import { UsersTableProvider } from "../../state-management/context/usersTableContext";

const iconMap: Record<string, string> = {
  users: UsersIcon,
  "active users": ActiveUsersIcon,
  "users with loans": UsersWithLoansIcon,
  "users with savings": UsersWithSavingsIcon,
};
import { tableHeaders } from "./data";
import Loader from "@components/loader";

const UsersContent = () => {
  const {
    data: { kpis, records, pagination },
    loading,
    error,
  } = useUsersData();
  console.log("changed records: ", records);

  if (error) {
    return (
      <div className={pageStyles.pages__container}>
        <h2 className={pageStyles.pages__title}>Error</h2>
        <p className={pageStyles.pages__error}>{error}</p>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={pageStyles.pages__container}>
      <h2 className={pageStyles.pages__title}>users</h2>

      <section className={pageStyles.pages__section}>
        <ul className={pageStyles.pages__kpis}>
          {kpis.map(({ label, value }, index) => (
            <li key={index} className={pageStyles.pages__kpis__item}>
              <Kpi
                label={label}
                value={parseInt(value)}
                icon={iconMap[label]}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className={pageStyles.pages__section}>
        <Table
          tableHeaders={tableHeaders}
          paginationData={{ data: records, pagination }}
        />
      </section>
    </div>
  );
};

const Users = () => {
  return (
    <UsersTableProvider>
      <UsersContent />
    </UsersTableProvider>
  );
};

export default Users;
