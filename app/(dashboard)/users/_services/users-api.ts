import { apiClient } from "@/app/_lib/api/client";
import type { User } from "@/app/_lib/types/user";

type UsersListResponse = {
  users: User[];
};

type UserDetailResponse = {
  user: User;
};

export type UsersKpi = {
  label: string;
  value: number;
};

type UsersKpisResponse = {
  kpis: UsersKpi[];
};

export async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get<UsersListResponse>("/users");
  return response.data.users;
}

export async function fetchUserById(id: string): Promise<User> {
  const response = await apiClient.get<UserDetailResponse>(`/users/${id}`);
  return response.data.user;
}

export async function fetchUsersKpis(): Promise<UsersKpi[]> {
  const response = await apiClient.get<UsersKpisResponse>("/users/kpis");
  return response.data.kpis;
}
