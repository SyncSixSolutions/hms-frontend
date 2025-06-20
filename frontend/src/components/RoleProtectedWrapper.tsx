import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utility/auth";

interface Props {
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const userRole = getUserRole();
  const isAuthorized = allowedRoles.includes(userRole);

  return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleProtectedRoute;