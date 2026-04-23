"use client";

import { useEffect } from "react";
import { useUserDetailsQuery } from "@/app/(dashboard)/users/_hooks/use-user-details-query";
import { useUserQuery } from "@/app/(dashboard)/users/_hooks/use-user-query";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";

export function useUserDetailsPageData(userId: string) {
  const detailsQuery = useUserDetailsQuery(userId);
  const userQuery = useUserQuery(userId);
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);
  const setUserDetails = useUsersStore((state) => state.setUserDetails);
  const resetUserDetails = useUsersStore((state) => state.resetUserDetails);

  useEffect(() => {
    if (detailsQuery.data) {
      setUserDetails(detailsQuery.data);
      return;
    }

    if (detailsQuery.isError) {
      resetUserDetails();
    }
  }, [
    detailsQuery.data,
    detailsQuery.isError,
    resetUserDetails,
    setUserDetails,
  ]);

  useEffect(() => {
    if (userQuery.data) {
      setSelectedUser(userQuery.data);
      return;
    }

    if (userQuery.isError) {
      setSelectedUser(null);
    }
  }, [setSelectedUser, userQuery.data, userQuery.isError]);

  useEffect(() => {
    return () => {
      resetUserDetails();
    };
  }, [resetUserDetails]);

  return {
    isLoading: detailsQuery.isLoading || userQuery.isLoading,
    isError: detailsQuery.isError || userQuery.isError,
  };
}
