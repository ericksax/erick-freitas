import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { Loader2 } from "lucide-react";

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
