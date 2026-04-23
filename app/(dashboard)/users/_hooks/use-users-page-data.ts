"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUsersKpisQuery } from "@/app/(dashboard)/users/_hooks/use-users-kpis-query";
import { useUsersQuery } from "@/app/(dashboard)/users/_hooks/use-users-query";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";

function getPositiveInt(value: string | null, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function useUsersPageData() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const filters = {
    organization: searchParams.get("organization") || undefined,
    username: searchParams.get("username") || undefined,
    email: searchParams.get("email") || undefined,
    date: searchParams.get("date") || undefined,
    phoneNumber: searchParams.get("phoneNumber") || undefined,
    status:
      statusParam === "active" ||
      statusParam === "inactive" ||
      statusParam === "pending" ||
      statusParam === "blacklisted"
        ? statusParam
        : undefined,
  } as const;
  const pagination = {
    page: getPositiveInt(searchParams.get("page"), 1),
    rows: getPositiveInt(searchParams.get("rows"), 10),
  } as const;
  const usersQuery = useUsersQuery(filters, pagination);
  const kpisQuery = useUsersKpisQuery();
  const setUsers = useUsersStore((state) => state.setUsers);
  const setUsersTotal = useUsersStore((state) => state.setUsersTotal);
  const setOrganizations = useUsersStore((state) => state.setOrganizations);
  const setUsersKpis = useUsersStore((state) => state.setUsersKpis);

  useEffect(() => {
    if (usersQuery.data) {
      setUsers(usersQuery.data.users);
      setUsersTotal(usersQuery.data.pagination.total);
      setOrganizations(usersQuery.data.organizations);
    }
  }, [setOrganizations, setUsers, setUsersTotal, usersQuery.data]);

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
