import Button from "@components/ui/buttons/Button";
import styles from "./activation-buttons.module.scss";
import type { StatusSchemaType } from "@schemas/Schema";

interface ActivationButtonsProps {
  status: StatusSchemaType;
}

const ActivationButtons = ({ status }: ActivationButtonsProps) => {
  return (
    <section className={styles["activation-buttons"]}>
      {status === "active" && (
        <Button
          className={`btn--outline ${styles["activation-buttons__blacklist"]}`}
        >
          Blacklist User
        </Button>
      )}
      {status === "pending" ||
        status === "inactive" ||
        (status === "blacklisted" && (
          <Button
            className={`btn--outline ${styles["activation-buttons__activate"]}`}
          >
            Activate User
          </Button>
        ))}
    </section>
  );
};

export default ActivationButtons;
