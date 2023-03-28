import React from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handlerLogout = async () => {
    localStorage.clear();
    message.success("logout successfully");
    delete axios.defaults.headers.common["authorization"];
    navigate("/login");
  };

  const handlerPromos = async () => {
    navigate("/promocodelist");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand mr-0" to="/">
            Book My Show
          </Link>
          <div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/userdetails"
                  aria-current="page"
                >
                  {name}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handlerPromos()}
                  className="mb-2 mr-2 btn btn-primary"
                >
                  Promos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlerLogout()}
                  className="mb-2 btn btn-primary"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
