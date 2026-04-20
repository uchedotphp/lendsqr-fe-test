export const routes = {
  root: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  users: "/dashboard/users",
  userDetails: (userId: string) => `/users/${userId}`,
} as const;
