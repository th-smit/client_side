import React from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { RiCoupon2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

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
  const handlerReport = async () => {
    navigate("/report");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand mr-0" to="/">
            <img
              style={{ width: "160px", height: "60px" }}
              id="screenimage"
              src="/images/logo.png"
              alt="logo"
            />
          </Link>
          <div>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link
                  style={{ color: "white" }}
                  className="nav-link mr-2"
                  to="/userdetails"
                  aria-current="page"
                >
                  <CgProfile style={{ fontSize: "25px" }} />
                  {/* {name} */}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  style={{ color: "white", backgroundColor: "#424242" }}
                  onClick={() => handlerPromos()}
                  className="mb-2 mr-2 nav-link"
                >
                  <RiCoupon2Line style={{ fontSize: "25px" }} />
                </button>
              </li>
              <li>
                <button
                  style={{ color: "white", backgroundColor: "#424242" }}
                  onClick={() => handlerLogout()}
                  className="mb-2 mr-2 nav-link"
                >
                  <FiLogOut style={{ fontSize: "25px" }} />
                </button>
              </li>
              <li>
                <button
                  style={{ color: "white", backgroundColor: "#424242" }}
                  onClick={() => handlerReport()}
                  className="mb-2 nav-link"
                >
                  <TbBrandGoogleAnalytics style={{ fontSize: "25px" }} />
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
