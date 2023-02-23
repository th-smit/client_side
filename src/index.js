import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
if (localStorage.getItem("token")) {
  axios.defaults.headers.common["authorization"] =
    localStorage.getItem("token");
} else {
  delete axios.defaults.headers.common["authorization"];
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
