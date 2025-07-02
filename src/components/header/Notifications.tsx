import NotificationIcon from "@assets/icons/notification.svg";
import Button from "@components/ui/buttons/Button";
import styles from "./notifications.module.scss";
import { useState } from "react";

const Notifications = () => {
  const [notificationsCount, setNotificationsCount] = useState(0);

  const formatCountDisplay = () =>
    notificationsCount >= 9 ? "9+" : notificationsCount;

  return (
    <Button
      onClick={() => setNotificationsCount(notificationsCount + 1)}
      className={styles.notifications}
    >
      <span
        className={`${styles.notifications__badge} ${[
          notificationsCount ? "show" : "hide",
        ]}`}
      >
        {formatCountDisplay()}
      </span>
      <img src={NotificationIcon} alt="notification icon" />
    </Button>
  );
};

export default Notifications;
