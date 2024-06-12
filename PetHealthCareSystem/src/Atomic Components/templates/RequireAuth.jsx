import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../config/provider/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <>
      {auth?.userName ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login"
          state={{ from: location }}
          replace
        />
      )}
    </>
  );
};

export default RequireAuth;
