import styles from "./not-found.module.scss";
import Goback from "@components/goback/GoBack";

interface NotFoundProps {
  message?: string;
  showBackButton?: boolean;
}

const NotFound = ({
  message = "Page not found",
  showBackButton = true,
}: NotFoundProps) => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__content}>
        <h1>404</h1>
        <h2>{message}</h2>
        <p>
          The page you're looking for doesn't exist or you don't have permission
          to access it.
        </p>
        {showBackButton && (
          <div className={styles.notFound__content__goback}>
            <Goback label="Go Back" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;
