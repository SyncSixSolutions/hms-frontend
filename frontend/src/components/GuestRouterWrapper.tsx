import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utility/auth";


const GuestRouterWrapper: React.FC = () => {
  const roles = getUserRole();

  if (roles.includes("admin")) {
    return <Navigate to="/dashboard-admin" replace />;
  } else if (roles.includes("receptionist")) {
    return <Navigate to="/rooms" replace />;
  } else if (roles.includes("customer")) {
    return <Navigate to="/dashboard-client" replace />;
  }

  return <Outlet />;
};

export default GuestRouterWrapper;