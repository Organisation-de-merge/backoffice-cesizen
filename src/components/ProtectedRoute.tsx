import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface ProtectedRouteProps {
  minRole: number;
}

export default function ProtectedRoute({ minRole }: ProtectedRouteProps) {
  const { user, token } = useUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role.level < minRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}