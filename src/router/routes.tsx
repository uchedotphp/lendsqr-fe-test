import { createBrowserRouter } from "react-router";
import Dashboard from "@pages/Dashboard";
import LoginPage from "@pages/auth/Login";
import AuthLayout from "@layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
    ],
  },
]);
