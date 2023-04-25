import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container" id="layout">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
