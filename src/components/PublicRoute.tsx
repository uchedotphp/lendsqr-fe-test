import React from "react";
import { Navigate, useLocation } from "react-router";
import { isAuthenticated } from "../services/auth";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const location = useLocation();

  if (isAuthenticated()) {
    // Redirect authenticated users to dashboard or the intended page
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute; 