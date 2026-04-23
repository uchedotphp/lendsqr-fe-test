"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Button } from "@/app/_components/button/button";
import styles from "@/app/(dashboard)/users/styles/users-table-pagination.module.scss";

const LEADING_PAGES = 3;
const TRAILING_PAGES = 2;
const MIDDLE_WINDOW = 1;

type UsersTablePaginationProps = {
  page: number;
  rows: number;
  totalRows: number;
  totalPages: number;
  rowsOptions?: readonly number[];
  onPageChange: (page: number) => void;
  onRowsChange: (rows: number) => void;
};

function buildPageItems(
  page: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= LEADING_PAGES + TRAILING_PAGES + 1) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= LEADING_PAGES) {
    return [1, 2, 3, "ellipsis", totalPages - 1, totalPages];
  }

  if (page >= totalPages - TRAILING_PAGES + 1) {
    return [1, 2, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  if (totalPages <= 1) {
    return [1];
  }
  return [
    1,
    "ellipsis",
    page - MIDDLE_WINDOW,
    page,
    page + MIDDLE_WINDOW,
    "ellipsis",
    totalPages,
  ];
}

export function UsersTablePagination({
  page,
  rows,
  totalRows,
  totalPages,
  rowsOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsChange,
}: UsersTablePaginationProps) {
  const items = buildPageItems(page, totalPages);
  const renderedItems: Array<
    | { id: string; type: "ellipsis" }
    | { id: string; type: "page"; page: number }
  > = [];
  let ellipsisCount = 0;

  for (const item of items) {
    if (item === "ellipsis") {
      ellipsisCount += 1;
      renderedItems.push({ id: `ellipsis-${ellipsisCount}`, type: "ellipsis" });
      continue;
    }

    renderedItems.push({ id: `page-${item}`, type: "page", page: item });
  }

  return (
    <footer className={styles.pagination}>
      <div className={styles.pagination__rows}>
        <span>Showing</span>
        <label className={styles.pagination__selectWrap}>
          <span className={styles.pagination__srOnly}>Rows per page</span>
          <select
            value={rows}
            onChange={(event) => {
              onRowsChange(Number(event.target.value));
            }}
          >
            {rowsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <span>out of {totalRows}</span>
      </div>

      <nav className={styles.pagination__pages} aria-label="Users table pages">
        <Button
          variant="ghost"
          size="sm"
          className={styles.pagination__arrow}
          onClick={() => {
            onPageChange(page - 1);
          }}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <HiChevronLeft />
        </Button>

        {renderedItems.map((item) => {
          if (item.type === "ellipsis") {
            return (
              <span key={item.id} className={styles.pagination__ellipsis}>
                ...
              </span>
            );
          }

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={styles.pagination__page}
              data-active={item.page === page}
              onClick={() => {
                onPageChange(item.page);
              }}
            >
              {item.page}
            </Button>
          );
        })}

        <Button
          variant="ghost"
          size="sm"
          className={styles.pagination__arrow}
          onClick={() => {
            onPageChange(page + 1);
          }}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <HiChevronRight />
        </Button>
      </nav>
    </footer>
  );
}
