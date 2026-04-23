"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  HiBars3BottomLeft,
  HiChevronDown,
  HiEllipsisVertical,
  HiOutlineCalendarDays,
  HiOutlineEye,
  HiOutlineUserMinus,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { toast } from "sonner";
import { routes } from "@/app/_lib/constants/routes";
import type { User } from "@/app/_lib/types/user";
import { UsersTablePagination } from "@/app/(dashboard)/users/_components/users-table-pagination";
import {
  formatDateJoined,
  getPositiveInt,
} from "@/app/(dashboard)/users/_lib/users-table-helpers";
import {
  updateUserActivationStatus,
  updateUserBlacklistStatus,
} from "@/app/(dashboard)/users/_services/users-api";
import { useUsersStore } from "@/app/(dashboard)/users/_services/users-store";
import styles from "@/app/(dashboard)/users/styles/users-table.module.scss";

const DEFAULT_PAGE = 1;
const DEFAULT_ROWS = 10;

const TABLE_HEADERS = [
  { key: "organization", label: "Organization" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "dateJoined", label: "Date Joined" },
  { key: "status", label: "Status" },
] as const;

type FilterPanelProps = {
  open: boolean;
};

function FilterPanel({ open }: FilterPanelProps) {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterPanel__field}>
        <span>Organization</span>
        <div className={styles.filterPanel__select}>
          <span>Select</span>
          <HiChevronDown />
        </div>
      </div>

      <label className={styles.filterPanel__field}>
        <span>Username</span>
        <input type="text" placeholder="User" />
      </label>

      <label className={styles.filterPanel__field}>
        <span>Email</span>
        <input type="email" placeholder="Email" />
      </label>

      <label className={styles.filterPanel__field}>
        <span>Date</span>
        <div className={styles.filterPanel__date}>
          <input type="text" placeholder="Date" />
          <HiOutlineCalendarDays />
        </div>
      </label>

      <label className={styles.filterPanel__field}>
        <span>Phone Number</span>
        <input type="text" placeholder="Phone Number" />
      </label>

      <div className={styles.filterPanel__field}>
        <span>Status</span>
        <div className={styles.filterPanel__select}>
          <span>Select</span>
          <HiChevronDown />
        </div>
      </div>

      <div className={styles.filterPanel__actions}>
        <button type="button" className={styles.filterPanel__reset}>
          Reset
        </button>
        <button type="button" className={styles.filterPanel__apply}>
          Filter
        </button>
      </div>
    </div>
  );
}

type RowActionMenuProps = {
  user: User;
  open: boolean;
  onBlacklistToggle: (user: User) => void;
  onActivationToggle: (user: User) => void;
  statusPending: boolean;
};

function RowActionMenu({
  user,
  open,
  onBlacklistToggle,
  onActivationToggle,
  statusPending,
}: RowActionMenuProps) {
  if (!open) {
    return null;
  }

  const blacklistLabel =
    user.status === "blacklisted" ? "Unban User" : "Blacklist User";
  const activationLabel =
    user.status === "active" ? "Deactivate User" : "Activate User";

  return (
    <div className={styles.rowActions}>
      <Link
        href={routes.userDetails(user.id)}
        className={styles.rowActions__item}
      >
        <HiOutlineEye />
        <span>View Details</span>
      </Link>
      <button
        type="button"
        className={styles.rowActions__item}
        onClick={() => {
          onBlacklistToggle(user);
        }}
        disabled={statusPending}
      >
        <HiOutlineUserMinus />
        <span>{blacklistLabel}</span>
      </button>
      <button
        type="button"
        className={styles.rowActions__item}
        onClick={() => {
          onActivationToggle(user);
        }}
        disabled={statusPending}
      >
        <HiOutlineUserPlus />
        <span>{activationLabel}</span>
      </button>
    </div>
  );
}

export function UsersTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [activeFilterHeader, setActiveFilterHeader] = useState<string | null>(
    null,
  );
  const [activeUserAction, setActiveUserAction] = useState<string | null>(null);
  const tableBlockRef = useRef<HTMLElement | null>(null);
  const queryClient = useQueryClient();

  const users = useUsersStore((state) => state.users);
  const refreshUsers = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const blacklistMutation = useMutation({
    mutationFn: ({
      userId,
      shouldBlacklist,
    }: {
      userId: string;
      shouldBlacklist: boolean;
    }) => updateUserBlacklistStatus(userId, shouldBlacklist),
    onSuccess: (_updatedUser, variables) => {
      refreshUsers();
      toast.success(
        variables.shouldBlacklist
          ? "User has been blacklisted."
          : "User has been unbanned.",
      );
    },
    onError: () => {
      toast.error("Could not update blacklist status. Please try again.");
    },
  });

  const activationMutation = useMutation({
    mutationFn: ({
      userId,
      shouldActivate,
    }: {
      userId: string;
      shouldActivate: boolean;
    }) => updateUserActivationStatus(userId, shouldActivate),
    onSuccess: (_updatedUser, variables) => {
      refreshUsers();
      toast.success(
        variables.shouldActivate
          ? "User has been activated."
          : "User has been deactivated.",
      );
    },
    onError: () => {
      toast.error("Could not update activation status. Please try again.");
    },
  });

  useEffect(() => {
    if (!activeUserAction) {
      return;
    }

    const handleOutsidePointerDown = (event: MouseEvent) => {
      const container = tableBlockRef.current;
      if (!container) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const insideOpenMenu = Boolean(target.closest("[data-row-action-menu]"));
      const onActionTrigger = Boolean(
        target.closest("[data-row-action-trigger]"),
      );

      if (!container.contains(target)) {
        setActiveUserAction(null);
        return;
      }

      if (!insideOpenMenu && !onActionTrigger) {
        setActiveUserAction(null);
      }
    };

    document.addEventListener("mousedown", handleOutsidePointerDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsidePointerDown);
    };
  }, [activeUserAction]);

  const page = getPositiveInt(searchParams.get("page"), DEFAULT_PAGE);
  const rows = getPositiveInt(searchParams.get("rows"), DEFAULT_ROWS);
  const totalPages = Math.max(1, Math.ceil(users.length / rows));
  const safePage = Math.min(page, totalPages);

  const pagedUsers = useMemo(
    () => users.slice((safePage - 1) * rows, safePage * rows),
    [rows, safePage, users],
  );

  const updatePaginationParams = (nextPage: number, nextRows: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    params.set("rows", String(nextRows));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className={styles.tableBlock} ref={tableBlockRef}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th key={header.key}>
                  <div className={styles.table__headerCell}>
                    <span>{header.label}</span>
                    <button
                      type="button"
                      className={styles.table__iconButton}
                      data-filter-trigger
                      onClick={() => {
                        setActiveFilterHeader((current) =>
                          current === header.key ? null : header.key,
                        );
                      }}
                      aria-label={`Open ${header.label} filters`}
                    >
                      <HiBars3BottomLeft />
                    </button>
                    <div data-filter-panel>
                      <FilterPanel open={activeFilterHeader === header.key} />
                    </div>
                  </div>
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{formatDateJoined(user.dateJoined)}</td>
                <td>
                  <span
                    className={styles.table__status}
                    data-status={user.status}
                  >
                    {user.status}
                  </span>
                </td>
                <td className={styles.table__actionsCell}>
                  <button
                    type="button"
                    className={styles.table__iconButton}
                    data-row-action-trigger
                    onClick={() => {
                      setActiveUserAction((current) =>
                        current === user.id ? null : user.id,
                      );
                    }}
                    aria-label={`Open actions for ${user.username}`}
                  >
                    <HiEllipsisVertical />
                  </button>
                  <div data-row-action-menu>
                    <RowActionMenu
                      user={user}
                      open={activeUserAction === user.id}
                      statusPending={
                        blacklistMutation.isPending ||
                        activationMutation.isPending
                      }
                      onBlacklistToggle={(targetUser) => {
                        const shouldBlacklist =
                          targetUser.status !== "blacklisted";
                        blacklistMutation.mutate({
                          userId: targetUser.id,
                          shouldBlacklist,
                        });
                        setActiveUserAction(null);
                      }}
                      onActivationToggle={(targetUser) => {
                        const shouldActivate = targetUser.status !== "active";
                        activationMutation.mutate({
                          userId: targetUser.id,
                          shouldActivate,
                        });
                        setActiveUserAction(null);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UsersTablePagination
        page={safePage}
        rows={rows}
        totalRows={users.length}
        totalPages={totalPages}
        onPageChange={(nextPage) => {
          const bounded = Math.max(1, Math.min(totalPages, nextPage));
          updatePaginationParams(bounded, rows);
        }}
        onRowsChange={(nextRows) => {
          updatePaginationParams(1, nextRows);
        }}
      />
    </section>
  );
}
