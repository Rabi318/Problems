import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, role } = useAuthState();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return role === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
