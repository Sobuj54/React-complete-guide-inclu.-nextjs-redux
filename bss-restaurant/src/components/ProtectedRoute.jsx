import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import DashboardLayoutSkeleton from "./ui/DashboardLayoutSkeleton";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <DashboardLayoutSkeleton />;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
