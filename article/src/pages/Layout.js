import React from "react";
import { Outlet } from "react-router-dom";
// import { Helmet } from "react-helmet";

const Layout = () => {
  // const helmet = Helmet.renderStatic();
  // console.log(helmet.meta.toString());
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
