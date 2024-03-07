// src/components/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles, children }) => {
  const { isLoggedIn, hasRole } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // console.log("Hit before forced redirect to login page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRole(...allowedRoles)) {
    // console.log("Hit before forced redirect to home page");
    // If user is not authorized, redirect them to the home page.
    return <Navigate to="/" replace />;
  }

  // console.log("Hit before return children");
  return children;
};

export default RequireAuth;
