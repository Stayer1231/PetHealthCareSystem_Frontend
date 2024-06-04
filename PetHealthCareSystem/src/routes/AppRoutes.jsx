import React from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../Atomic Components/pages/CommonLayout/CommonLayout";
import ScrollToTop from "./../Atomic Components/others/ScrollToTop";

function AppRoutes() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={<CommonLayout />}
          >
            {" "}
          </Route>
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default AppRoutes;
