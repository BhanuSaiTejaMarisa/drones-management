import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "./useUser";
export default function PrivateRoutes() {
  const { user, isLoading } = useUser();
 
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
}
