export const routes = {
  root: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  users: "/users",
  userDetails: (userId: string) => `/users/${userId}`,
} as const;
