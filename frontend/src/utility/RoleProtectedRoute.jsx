import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "./GetUserRole";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const userRoles = getUserRole();

  const isAuthorized = userRoles?.some((role) => allowedRoles.includes(role));

  return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default RoleProtectedRoute;
