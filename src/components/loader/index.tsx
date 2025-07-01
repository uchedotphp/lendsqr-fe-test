import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader} data-testid="loader">
      <div className={styles.container}>
        <div className={styles.spinner} />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
