"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/app/_components/button/button";
import { HeadingText } from "@/app/_components/typography/heading-text";
import type { User } from "@/app/_lib/types/user";
import {
  updateUserActivationStatus,
  updateUserBlacklistStatus,
} from "@/app/(dashboard)/users/_services/users-api";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";
import styles from "@/app/(dashboard)/users/styles/user-details-view.module.scss";

export function UserDetailsTopHeader() {
  const queryClient = useQueryClient();
  const selectedUser = useUsersStore((state) => state.selectedUser);
  const userDetails = useUsersStore((state) => state.userDetails);
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);
  const setUserDetails = useUsersStore((state) => state.setUserDetails);
  const userId = userDetails?.id ?? selectedUser?.id;
  const blacklistActionLabel =
    userDetails?.status === "blacklisted" ? "UNBAN USER" : "BLACKLIST USER";
  const activationActionLabel =
    userDetails?.status === "active" ? "DEACTIVATE USER" : "ACTIVATE USER";
  const syncStatusToStore = (status: User["status"]) => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, status });
    }
    if (userDetails) {
      setUserDetails({ ...userDetails, status });
    }
  };

  const invalidateUserQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["users"] }),
      queryClient.invalidateQueries({ queryKey: ["user", userId] }),
      queryClient.invalidateQueries({ queryKey: ["user-details", userId] }),
    ]);
  };

  const blacklistMutation = useMutation({
    mutationFn: (shouldBlacklist: boolean) => {
      if (!userId) {
        throw new Error("User id is not available.");
      }
      return updateUserBlacklistStatus(userId, shouldBlacklist);
    },
    onSuccess: async (updatedUser, shouldBlacklist) => {
      syncStatusToStore(updatedUser.status);
      await invalidateUserQueries();
      toast.success(
        shouldBlacklist
          ? "User has been blacklisted."
          : "User has been unbanned.",
      );
    },
    onError: () => {
      toast.error("Could not update blacklist status. Please try again.");
    },
  });

  const activationMutation = useMutation({
    mutationFn: (shouldActivate: boolean) => {
      if (!userId) {
        throw new Error("User id is not available.");
      }
      return updateUserActivationStatus(userId, shouldActivate);
    },
    onSuccess: async (updatedUser, shouldActivate) => {
      syncStatusToStore(updatedUser.status);
      await invalidateUserQueries();
      toast.success(
        shouldActivate
          ? "User has been activated."
          : "User has been deactivated.",
      );
    },
    onError: () => {
      toast.error("Could not update activation status. Please try again.");
    },
  });

  const actionsPending =
    blacklistMutation.isPending || activationMutation.isPending;

  return (
    <header className={styles["user-details__top-header"]}>
      <HeadingText
        level="h2"
        size="xl"
        className={styles["user-details__title"]}
      >
        User Details
      </HeadingText>

      <div className={styles["user-details__actions"]}>
        <Button
          variant="ghost"
          className={styles["user-details__danger-action"]}
          loading={blacklistMutation.isPending}
          disabled={actionsPending || !userId}
          onClick={() => {
            const shouldBlacklist = userDetails?.status !== "blacklisted";
            blacklistMutation.mutate(shouldBlacklist);
          }}
        >
          {blacklistActionLabel}
        </Button>
        <Button
          variant="ghost"
          className={styles["user-details__safe-action"]}
          loading={activationMutation.isPending}
          disabled={actionsPending || !userId}
          onClick={() => {
            const shouldActivate = userDetails?.status !== "active";
            activationMutation.mutate(shouldActivate);
          }}
        >
          {activationActionLabel}
        </Button>
      </div>
    </header>
  );
}
