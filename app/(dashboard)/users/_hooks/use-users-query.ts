"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/app/(dashboard)/users/_services/users-api";

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
