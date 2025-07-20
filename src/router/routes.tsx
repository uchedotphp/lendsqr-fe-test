import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import ProtectedRoute from "@components/ProtectedRoute";
import PublicRoute from "@components/PublicRoute";
import LazyRoute from "@components/LazyRoute";
import MainLayout from "@layouts/MainLayout";
import NotFound from "@pages/notFound/NotFound";
import Users from "@pages/users";
import { UserProvider } from "../state-management/context/userContext";

const Dashboard = lazy(() => import("@pages/Dashboard"));
const LoginPage = lazy(() => import("@pages/auth/Login"));
const AuthLayout = lazy(() => import("@layouts/AuthLayout"));
const User = lazy(() => import("@pages/User"));
const UserGeneralDetails = lazy(() => import("@pages/userDetails/UserGeneralDetails"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LazyRoute>
          <MainLayout />
        </LazyRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <Dashboard />
          </LazyRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <LazyRoute>
            <Dashboard />
          </LazyRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <LazyRoute>
            <Users />
          </LazyRoute>
        ),
      },
      {
        path: "/users/:userId/:tab",
        element: (
          <UserProvider>
            <LazyRoute>
              <User />
            </LazyRoute>
          </UserProvider>
        ),
        children: [
          {
            index: true,
            element: (
              <LazyRoute>
                <UserGeneralDetails />
              </LazyRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LazyRoute>
              <LoginPage />
            </LazyRoute>
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <LazyRoute>
        <NotFound />
      </LazyRoute>
    ),
  },
]);
