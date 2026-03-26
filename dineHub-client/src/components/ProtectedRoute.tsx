import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { APP_ROUTES } from "../config/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to={APP_ROUTES.RESTAURANTS} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
