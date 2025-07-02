import { createContext, type ReactNode, useState } from "react";

interface UsersTableContextProps {
  page: number;
  perPage: number;
  updateQuery: (query: { page?: number; perPage?: number }) => void;
}

const UsersTableContext = createContext<UsersTableContextProps>({
  page: 1,
  perPage: 10,
  updateQuery: () => {},
} as UsersTableContextProps);

export const UsersTableProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handleUpdateQuery = (newQuery: { page?: number; perPage?: number }) => {
    if (newQuery.page !== undefined) {
      setPage(newQuery.page);
    }
    if (newQuery.perPage !== undefined) {
      setPerPage(newQuery.perPage);
    }
  };

  return (
    <UsersTableContext.Provider
      value={{
        page,
        perPage,
        updateQuery: handleUpdateQuery,
      }}
    >
      {children}
    </UsersTableContext.Provider>
  );
};

export default UsersTableContext;
