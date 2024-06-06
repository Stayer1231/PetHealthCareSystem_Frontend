import React from "react";
import Header from "../../organisms/Header/Header";
import Footer from "./../../organisms/Footer/Footer";
import "./CommonLayout.scss";
import { Outlet } from "react-router-dom";

function CommonLayout() {
  return (
    <>
      <Header />
      <div className="page-layout-body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default CommonLayout;
