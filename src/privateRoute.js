import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
