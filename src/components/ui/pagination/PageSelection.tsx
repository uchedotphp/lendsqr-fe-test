import styles from "./pagination.module.scss";
import Button from "@components/ui/buttons/Button";
import UsersTableContext from "../../../state-management/context/usersTableContext";
import { useContext } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const PageSelection = ({ totalPages, currentPage }: PaginationProps) => {
  const { updateQuery } = useContext(UsersTableContext);
  const pagination = [];

  // Always show first page
  if (currentPage >= 1) {
    pagination.push(1);
    if (currentPage > 4) pagination.push("..."); // Add ellipsis if far from start
  }

  // range around current page
  let start = Math.max(currentPage - 1, 1);
  let end = Math.min(currentPage + 1, totalPages);

  if (currentPage <= 3) {
    end = Math.min(3, totalPages);
  } else if (currentPage >= totalPages - 2) {
    start = Math.max(totalPages - 2, 1);
  }

  for (let i = start; i <= end; i++) {
    if (i !== 1 || currentPage > 4) pagination.push(i); // Avoid duplicate 1
  }

  // Always show last page
  if (currentPage < totalPages) {
    if (currentPage < totalPages - 3) pagination.push("..."); // Add ellipsis if far from end
    pagination.push(totalPages);
  }

  const handlePageChange = (newPage: number) => {
    updateQuery({ page: newPage });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      updateQuery({ page: currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      updateQuery({ page: currentPage + 1 });
    }
  };

  return (
    <section className={styles.page}>
      <Button
        className={styles.page__icon}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00609 10.0573C7.84719 10.8984 6.54344 12.1595 5.745 11.3184L0.994244 6.56759C0.61581 6.23127 0.61581 5.64282 0.994244 5.3065L5.61858 0.640017C6.45967 -0.158963 7.72082 1.10267 6.87967 1.94322L2.8859 5.937L7.00609 10.0573Z"
            fill="#213F7D"
          />
        </svg>
      </Button>

      {pagination.map((number, index) =>
        typeof number === "number" ? (
          <Button
            key={index}
            className={
              number === currentPage
                ? styles["page__number--active"]
                : styles.page__number
            }
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Button>
        ) : (
          <span key={index} className={styles.page__ellipsis}>
            {number}
          </span>
        )
      )}

      <Button
        className={styles.page__icon}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.993905 1.94274C0.152813 1.10165 1.45656 -0.159498 2.255 0.68165L7.00576 5.43241C7.38419 5.76873 7.38419 6.35718 7.00576 6.6935L2.38142 11.36C1.54033 12.159 0.279177 10.8973 1.12033 10.0568L5.1141 6.063L0.993905 1.94274Z"
            fill="#213F7D"
          />
        </svg>
      </Button>
    </section>
  );
};

export default PageSelection;
