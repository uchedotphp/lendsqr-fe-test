import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@components/ProtectedRoute";
import PublicRoute from "@components/PublicRoute";
import Loader from "@components/loader";
import MainLayout from "@layouts/MainLayout";
import NotFound from "@pages/notFound/NotFound";
import Users from "@pages/users";

const Dashboard = lazy(() => import("@pages/Dashboard"));
const LoginPage = lazy(() => import("@pages/auth/Login"));
const AuthLayout = lazy(() => import("@layouts/AuthLayout"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <MainLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<Loader />}>
            <Users />
          </Suspense>
        ),
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
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
