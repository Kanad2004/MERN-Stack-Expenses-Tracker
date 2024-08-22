import React from "react";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { Navigate } from "react-router-dom";
function AuthRoute({ children }) {
  const token = getUserFromStorage();
  const isLogin = token ? true : false;
  if (isLogin) return <>{children}</>;
  else {
    return <Navigate to="/login" />;
  }
}

export default AuthRoute;
