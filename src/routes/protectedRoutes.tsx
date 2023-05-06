import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoute() {
  const isAuthenticated = Cookies.get("access_token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
