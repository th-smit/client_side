import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const loggedIn = useState(localStorage.getItem("token") !== null);
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Protected;
