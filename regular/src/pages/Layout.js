import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  if (window.location.pathname === "/") {
    return (
      <>
        <Outlet />
        <ToastContainer />
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <Outlet />
        <ToastContainer />
        <Footer />
      </>
    );
  }
};

export default Layout;
