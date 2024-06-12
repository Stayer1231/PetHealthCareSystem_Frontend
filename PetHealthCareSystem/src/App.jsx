import { useState } from "react";
import "./App.scss";
import Header from "./Atomic Components/organisms/Header/Header";
import Footer from "./Atomic Components/organisms/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;