import { useUser } from "@/context/userContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function PublicRoute({ children, redirectTo = "/dashboard" }: PublicRouteProps) {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
}

