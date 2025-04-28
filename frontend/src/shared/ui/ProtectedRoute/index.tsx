import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
