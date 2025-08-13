import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuthState();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
