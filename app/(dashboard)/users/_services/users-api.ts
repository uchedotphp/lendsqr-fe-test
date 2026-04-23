import { apiClient } from "@/app/_lib/api/client";
import type { User, UserDetails } from "@/app/_lib/types/user";

type UsersListResponse = {
  users: User[];
};

type UserDetailResponse = {
  user: User;
};

type UserDetailsResponse = {
  userDetails: UserDetails;
};

export type UsersKpi = {
  label: string;
  value: number;
};

type UsersKpisResponse = {
  kpis: UsersKpi[];
};

type UpdateUserStatusResponse = {
  user: User;
};

export async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get<UsersListResponse>("/users");
  return response.data.users;
}

export async function fetchUserById(id: string): Promise<User> {
  const response = await apiClient.get<UserDetailResponse>(`/users/${id}`);
  return response.data.user;
}

export async function fetchUserDetailsById(id: string): Promise<UserDetails> {
  const response = await apiClient.get<UserDetailsResponse>(
    `/users/${id}/details`,
  );
  return response.data.userDetails;
}

export async function fetchUsersKpis(): Promise<UsersKpi[]> {
  const response = await apiClient.get<UsersKpisResponse>("/users/kpis");
  return response.data.kpis;
}

export async function updateUserBlacklistStatus(
  id: string,
  blacklisted: boolean,
): Promise<User> {
  const response = await apiClient.patch<UpdateUserStatusResponse>(
    `/users/${id}/blacklist`,
    { blacklisted },
  );

  return response.data.user;
}

export async function updateUserActivationStatus(
  id: string,
  active: boolean,
): Promise<User> {
  const response = await apiClient.patch<UpdateUserStatusResponse>(
    `/users/${id}/activate`,
    { active },
  );

  return response.data.user;
}
