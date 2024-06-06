import { useState } from "react";
import "./App.scss";
import Header from "./Atomic Components/organisms/Header/Header";
import Footer from "./Atomic Components/organisms/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
    </>
  );
}
