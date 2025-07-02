import CountDisplay from "./CountDisplay";
import PageSelection from "./PageSelection";
import styles from "./pagination.module.scss";
import { useContext } from "react";
import UsersTableContext from "../../../state-management/context/usersTableContext";

interface PaginationProps {
  currentPage: number;
  recordsCount: number;
}

const Pagination = ({ recordsCount, currentPage }: PaginationProps) => {
  const { perPage } = useContext(UsersTableContext);
  const totalPages = Math.ceil((recordsCount || 0) / perPage);

  return (
    <section className={styles.pagination}>
      <CountDisplay
        recordsCount={recordsCount}
      />
      <PageSelection
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </section>
  );
};

export default Pagination;
