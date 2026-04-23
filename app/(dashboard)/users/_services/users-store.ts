"use client";

import { create } from "zustand";
import type { User, UserDetails } from "@/app/_lib/types/user";
import type { UsersKpi } from "@/app/(dashboard)/users/_services/users-api";

export const USER_DETAILS_TABS = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
] as const;

export type UserDetailsTab = (typeof USER_DETAILS_TABS)[number];

type UsersStore = {
  users: User[];
  usersKpis: UsersKpi[];
  selectedUser: User | null;
  userDetails: UserDetails | null;
  activeUserDetailsTab: UserDetailsTab;
  setUsers: (users: User[]) => void;
  setUsersKpis: (usersKpis: UsersKpi[]) => void;
  setSelectedUser: (selectedUser: User | null) => void;
  setUserDetails: (userDetails: UserDetails | null) => void;
  setActiveUserDetailsTab: (tab: UserDetailsTab) => void;
  resetUserDetails: () => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  usersKpis: [],
  selectedUser: null,
  userDetails: null,
  activeUserDetailsTab: "General Details",
  setUsers: (users) => {
    set({ users });
  },
  setUsersKpis: (usersKpis) => {
    set({ usersKpis });
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
  setUserDetails: (userDetails) => {
    set({ userDetails });
  },
  setActiveUserDetailsTab: (activeUserDetailsTab) => {
    set({ activeUserDetailsTab });
  },
  resetUserDetails: () => {
    set({
      userDetails: null,
      selectedUser: null,
      activeUserDetailsTab: "General Details",
    });
  },
}));
