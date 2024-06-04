import React from "react";
import Header from "../../organisms/Header/Header";
import Footer from "./../../organisms/Footer/Footer";
import { Outlet } from "react-router-dom";

function CommonLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default CommonLayout;
