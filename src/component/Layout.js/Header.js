import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <d
            iv
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <Link className="navbar-brand mr-0" to="/">
              Book My Show
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active ml-0" to="/user">
                  User
                </Link>
              </li>
            </ul>
          </d>
        </div>
      </nav>
    </>
  );
};

export default Header;
