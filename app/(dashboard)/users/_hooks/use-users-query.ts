"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchUsers,
  type UsersFilters,
  type UsersPagination,
} from "@/app/(dashboard)/users/_services/users-api";

export function useUsersQuery(
  filters: UsersFilters,
  pagination: UsersPagination,
) {
  return useQuery({
    queryKey: ["users", filters, pagination],
    queryFn: () => fetchUsers(filters, pagination),
  });
}
