import Avatar from "@assets/icons/avatar.svg";
import Button from "@components/ui/buttons/Button";
import CaretDown from "@assets/icons/carret-down.svg";
import styles from "./avatar.module.scss";

interface AvatarProps {
  firstName?: string;
}

const index = ({ firstName }: AvatarProps) => {
  return (
    <Button className={styles.avatar}>
      <img src={Avatar} className={styles.avatar__image} alt="User Avatar" />
      {firstName && (
        <span className={`${styles.avatar__name} hide show-tablet`}>
          {firstName}
        </span>
      )}
      <img src={CaretDown} alt="caret down" />
    </Button>
  );
};

export default index;
