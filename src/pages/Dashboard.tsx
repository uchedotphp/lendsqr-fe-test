import pageStyles from "./pages.module.scss";
import Kpi from "@components/kpi/Kpi";
import Card from "@components/ui/card/Card";
import Button from "@components/ui/buttons/Button";
import Badge from "@components/badge/Badge";
import Loader from "@components/loader";
import useDashboardData, {
  type DashboardKPI,
  type DashboardActivity,
} from "@hooks/useDashboard";
import { DashboardProvider } from "../state-management/context/dashboardContext";
import UsersIcon from "@assets/icons/kpi-users.svg";
import ActiveUsersIcon from "@assets/icons/kpi-active-users.svg";
import UsersWithLoansIcon from "@assets/icons/kpi-users-with-loans.svg";
import UsersWithSavingsIcon from "@assets/icons/kpi-users-with-savings.svg";
import { getQuickActions } from "./dashboardData";

const iconMap: Record<string, string> = {
  "total loans": UsersWithLoansIcon,
  "active loans": ActiveUsersIcon,
  "total revenue": UsersWithSavingsIcon,
  "pending applications": UsersIcon,
};

const DashboardContent = () => {
  const {
    data: { kpis, activities, quickStats },
    loading,
    error,
  } = useDashboardData();

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

  const quickActions = getQuickActions(quickStats);

  return (
    <div className={pageStyles.pages__container}>
      <h2 className={pageStyles.pages__title}>Dashboard</h2>

      {/* KPI Section */}
      <section className={pageStyles.pages__section}>
        <h3 className={pageStyles.pages__section__title}>
          Key Performance Indicators
        </h3>
        <ul className={pageStyles.pages__kpis}>
          {kpis.map(({ label, value, currency }: DashboardKPI, index: number) => (
            <li key={index} className={pageStyles.pages__kpis__item}>
              <Kpi label={label} value={value} currency={currency} icon={iconMap[label]} />
            </li>
          ))}
        </ul>
      </section>

      {/* Quick Actions Section */}
      <section className={pageStyles.pages__section}>
        <h3 className={pageStyles.pages__section__title}>Quick Actions</h3>
        <div className={pageStyles.pages__grid}>
          {quickActions.map(
            ({ id, title, description, icon, count, action }) => (
              <Card key={id} className={pageStyles.pages__action__card}>
                <div className={pageStyles.pages__action__content}>
                  <div className={pageStyles.pages__action__header}>
                    <img src={icon} alt={title} />
                    {count && <Badge status="pending">{count}</Badge>}
                  </div>
                  <h4 className={pageStyles.pages__action__title}>{title}</h4>
                  <p className={pageStyles.pages__action__description}>
                    {description}
                  </p>
                  <Button
                    onClick={action}
                    className={pageStyles.pages__action__button}
                  >
                    Take Action
                  </Button>
                </div>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Recent Activities Section */}
      <section className={pageStyles.pages__section}>
        <h3 className={pageStyles.pages__section__title}>Recent Activities</h3>
        <Card>
          <div className={pageStyles.pages__activities}>
            {activities.map(
              ({
                id,
                user,
                action,
                amount,
                time,
                status,
              }: DashboardActivity) => (
                <div key={id} className={pageStyles.pages__activity__item}>
                  <div className={pageStyles.pages__activity__content}>
                    <div className={pageStyles.pages__activity__header}>
                      <h4 className={pageStyles.pages__activity__user}>
                        {user}
                      </h4>
                      <Badge status={status} />
                    </div>
                    <p className={pageStyles.pages__activity__action}>
                      {action}
                      {amount && (
                        <span className={pageStyles.pages__activity__amount}>
                          {" "}
                          of {amount}
                        </span>
                      )}
                    </p>
                    <span className={pageStyles.pages__activity__time}>
                      {time}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </Card>
      </section>
    </div>
  );
};

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;
