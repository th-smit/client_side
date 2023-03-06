import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  return localStorage.getItem("token") !== null ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Protected;
