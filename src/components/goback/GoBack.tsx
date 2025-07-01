import Button from "@components/ui/buttons/Button";
import BackIcon from "@assets/icons/back-icon.svg";
import { useNavigate } from "react-router";
import styles from "./go-back.module.scss";

const Goback = ({ label }: { label: string }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Button
      onClick={() => handleGoBack()}
      className={`${styles.goback} btn--flat`}
    >
      <img src={BackIcon} alt="back icon" />
      <span className={styles.goback__label}>{label}</span>
    </Button>
  );
};

export default Goback;
