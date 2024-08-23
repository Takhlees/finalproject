import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role, userRole }) => {
  if (!userRole) {
    return <Navigate to="/auth/login" replace />;
  }
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
