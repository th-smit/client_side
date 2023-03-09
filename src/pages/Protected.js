import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Protected = () => {
  let location = useLocation();
  const query = new URLSearchParams(window.location.search);
  const seats = query.get("seats");

  if (seats) {
    location = {
      ...location,
      pathname: location.pathname + `?seats=${seats}`,
    };
  }

  return localStorage.getItem("token") !== null ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ from: location }} />
  );
};

export default Protected;
