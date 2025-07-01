import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@components/ProtectedRoute";
import Loader from "@components/loader";
import MainLayout from "@layouts/MainLayout";

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
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
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
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
]);
