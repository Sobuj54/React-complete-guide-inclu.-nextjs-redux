import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <div>Loading BSS Restaurant...</div>;

  return isAuthenticated ? { children } : <Navigate to="/" replace />;
};

export default ProtectedRoute;
