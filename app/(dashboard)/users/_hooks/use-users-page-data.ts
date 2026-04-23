"use client";

import { useEffect } from "react";
import { useUsersKpisQuery } from "@/app/(dashboard)/users/_hooks/use-users-kpis-query";
import { useUsersQuery } from "@/app/(dashboard)/users/_hooks/use-users-query";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";

export function useUsersPageData() {
  const usersQuery = useUsersQuery();
  const kpisQuery = useUsersKpisQuery();
  const setUsers = useUsersStore((state) => state.setUsers);
  const setUsersKpis = useUsersStore((state) => state.setUsersKpis);

  useEffect(() => {
    if (usersQuery.data) {
      setUsers(usersQuery.data);
    }
  }, [setUsers, usersQuery.data]);

  useEffect(() => {
    if (kpisQuery.data) {
      setUsersKpis(kpisQuery.data);
    }
  }, [kpisQuery.data, setUsersKpis]);

  return {
    isLoading: usersQuery.isLoading || kpisQuery.isLoading,
    isError: usersQuery.isError || kpisQuery.isError,
  };
}
