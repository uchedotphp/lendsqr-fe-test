"use client";

import { FiSearch } from "react-icons/fi";
import { Button } from "@/app/_components/button/button";
import styles from "@/app/_components/header/header.module.scss";

export function HeaderSearch() {
  return (
    <search aria-label="Site-wide search">
      <form
        className={styles.header__search}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label className={styles.header__srOnly} htmlFor="header-search">
          Search for anything
        </label>
        <input
          id="header-search"
          name="search"
          type="search"
          placeholder="Search for anything"
          autoComplete="off"
        />
        <Button
          variant="ghost"
          size="sm"
          type="submit"
          aria-label="Submit search"
        >
          <FiSearch />
        </Button>
      </form>
    </search>
  );
}
