import Card from "@components/ui/card/Card";
import styles from "./kpi.module.scss";
import { formatNumber } from "@utils/helpers";

interface Kpi {
  label: string;
  value: string | number;
  currency?: boolean;
  icon: string;
}
const Kpi = ({ label, value, currency, icon }: Kpi) => {
  const displayValue =
    typeof value === "number" ? formatNumber(value) : value;

  return (
    <Card>
      <div className={styles.kpi__icon}>
        <img src={icon} alt="kpi icon" />
      </div>
      <h3 className={`${styles.kpi__label} truncate`}>{label}</h3>
      <p className={`${styles.kpi__value} truncate`}>
        {currency ? `₦${displayValue}` : displayValue}
      </p>
    </Card>
  );
};

export default Kpi;
