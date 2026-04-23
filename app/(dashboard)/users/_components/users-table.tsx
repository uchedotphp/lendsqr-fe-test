"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  organizations: string[];
  values: FilterValues;
  onFieldChange: (name: keyof FilterValues, value: string) => void;
  onReset: () => void;
  onApply: () => void;
  panelRef?: React.RefObject<HTMLDivElement | null>;
  style?: React.CSSProperties;
};

type FilterValues = {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
};

function FilterPanel({
  open,
  organizations,
  values,
  onFieldChange,
  onReset,
  onApply,
  panelRef,
  style,
}: FilterPanelProps) {
  if (!open) {
    return null;
  }

  return (
    <div ref={panelRef} className={styles.filterPanel} style={style}>
      <div className={styles.filterPanel__field}>
        <span>Organization</span>
        <div className={styles.filterPanel__selectWrap}>
          <select
            className={styles.filterPanel__select}
            value={values.organization}
            onChange={(event) => {
              onFieldChange("organization", event.target.value);
            }}
          >
            <option value="">Select</option>
            {organizations.map((organization) => (
              <option key={organization} value={organization}>
                {organization}
              </option>
            ))}
          </select>
          <HiChevronDown />
        </div>
      </div>

      <label className={styles.filterPanel__field}>
        <span>Username</span>
        <input
          type="text"
          placeholder="User"
          value={values.username}
          onChange={(event) => {
            onFieldChange("username", event.target.value);
          }}
        />
      </label>

      <label className={styles.filterPanel__field}>
        <span>Email</span>
        <input
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={(event) => {
            onFieldChange("email", event.target.value);
          }}
        />
      </label>

      <label className={styles.filterPanel__field}>
        <span>Date</span>
        <div className={styles.filterPanel__date}>
          <input
            type="date"
            placeholder="Date"
            value={values.date}
            onChange={(event) => {
              onFieldChange("date", event.target.value);
            }}
          />
          <HiOutlineCalendarDays />
        </div>
      </label>

      <label className={styles.filterPanel__field}>
        <span>Phone Number</span>
        <input
          type="text"
          placeholder="Phone Number"
          value={values.phoneNumber}
          onChange={(event) => {
            onFieldChange("phoneNumber", event.target.value);
          }}
        />
      </label>

      <div className={styles.filterPanel__field}>
        <span>Status</span>
        <div className={styles.filterPanel__selectWrap}>
          <select
            className={styles.filterPanel__select}
            value={values.status}
            onChange={(event) => {
              onFieldChange("status", event.target.value);
            }}
          >
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
          <HiChevronDown />
        </div>
      </div>

      <div className={styles.filterPanel__actions}>
        <button
          type="button"
          className={styles.filterPanel__reset}
          onClick={onReset}
        >
          Reset
        </button>
        <button
          type="button"
          className={styles.filterPanel__apply}
          onClick={onApply}
        >
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
  const [filterValues, setFilterValues] = useState<FilterValues>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });
  const [filterPanelPosition, setFilterPanelPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const tableBlockRef = useRef<HTMLElement | null>(null);
  const filterPanelRef = useRef<HTMLDivElement | null>(null);
  const filterTriggerRefs = useRef<
    Partial<
      Record<(typeof TABLE_HEADERS)[number]["key"], HTMLButtonElement | null>
    >
  >({});
  const queryClient = useQueryClient();

  const users = useUsersStore((state) => state.users);
  const usersTotal = useUsersStore((state) => state.usersTotal);
  const organizations = useUsersStore((state) => state.organizations);
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
    setFilterValues({
      organization: searchParams.get("organization") ?? "",
      username: searchParams.get("username") ?? "",
      email: searchParams.get("email") ?? "",
      date: searchParams.get("date") ?? "",
      phoneNumber: searchParams.get("phoneNumber") ?? "",
      status: searchParams.get("status") ?? "",
    });
  }, [searchParams]);

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

  useEffect(() => {
    if (!activeFilterHeader) {
      return;
    }

    const trigger =
      filterTriggerRefs.current[
        activeFilterHeader as (typeof TABLE_HEADERS)[number]["key"]
      ];

    if (!trigger) {
      return;
    }

    const updatePosition = () => {
      const rect = trigger.getBoundingClientRect();
      const viewportPadding = 16;
      const panelWidth = 270;
      const panelHeight = 540;
      const preferredLeft = rect.left - 18;
      const maxLeft = window.innerWidth - panelWidth - viewportPadding;
      const fitsBelow = rect.bottom + 10 + panelHeight <= window.innerHeight;
      const top = fitsBelow
        ? rect.bottom + 10
        : Math.max(viewportPadding, rect.top - panelHeight - 10);

      setFilterPanelPosition({
        top,
        left: Math.max(viewportPadding, Math.min(preferredLeft, maxLeft)),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [activeFilterHeader]);

  useEffect(() => {
    if (!activeFilterHeader) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const isInsidePanel = filterPanelRef.current?.contains(target);
      if (isInsidePanel) {
        return;
      }

      const clickedTrigger = Object.values(filterTriggerRefs.current).some(
        (ref) => ref?.contains(target),
      );
      if (clickedTrigger) {
        return;
      }

      setActiveFilterHeader(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [activeFilterHeader]);

  const page = getPositiveInt(searchParams.get("page"), DEFAULT_PAGE);
  const rows = getPositiveInt(searchParams.get("rows"), DEFAULT_ROWS);
  const totalPages = Math.max(1, Math.ceil(usersTotal / rows));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page > totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(totalPages));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [page, pathname, router, searchParams, totalPages]);

  const updatePaginationParams = (nextPage: number, nextRows: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    params.set("rows", String(nextRows));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    const fields = [
      "organization",
      "username",
      "email",
      "date",
      "phoneNumber",
      "status",
    ] as const;

    for (const field of fields) {
      const value = filterValues[field].trim();
      if (value.length > 0) {
        params.set(field, value);
      } else {
        params.delete(field);
      }
    }

    params.set("page", "1");
    params.set("rows", String(rows));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setActiveFilterHeader(null);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    const fields = [
      "organization",
      "username",
      "email",
      "date",
      "phoneNumber",
      "status",
    ] as const;

    for (const field of fields) {
      params.delete(field);
    }

    params.set("page", "1");
    params.set("rows", String(rows));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setActiveFilterHeader(null);
  };

  return (
    <section className={styles.tableBlock} ref={tableBlockRef}>
      <div className={styles.tableScroll}>
        <div className={styles.tableScroll__inner}>
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
                        ref={(element) => {
                          filterTriggerRefs.current[header.key] = element;
                        }}
                        onClick={() => {
                          setActiveFilterHeader((current) =>
                            current === header.key ? null : header.key,
                          );
                        }}
                        aria-label={`Open ${header.label} filters`}
                      >
                        <HiBars3BottomLeft />
                      </button>
                    </div>
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.table__empty}>
                    No users available for the selected filters.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
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
                            const shouldActivate =
                              targetUser.status !== "active";
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {activeFilterHeader && filterPanelPosition
        ? createPortal(
            <FilterPanel
              open
              panelRef={filterPanelRef}
              style={{
                top: filterPanelPosition.top,
                left: filterPanelPosition.left,
              }}
              organizations={organizations}
              values={filterValues}
              onFieldChange={(name, value) => {
                setFilterValues((current) => ({
                  ...current,
                  [name]: value,
                }));
              }}
              onApply={applyFilters}
              onReset={resetFilters}
            />,
            document.body,
          )
        : null}

      <UsersTablePagination
        page={safePage}
        rows={rows}
        totalRows={usersTotal}
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
