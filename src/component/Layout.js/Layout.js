import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <body className="container">{children}</body>

      <Footer />
    </>
  );
};

export default Layout;
