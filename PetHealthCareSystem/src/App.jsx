import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRouting from "./config/router/AppRouting";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  console.log("App");

  return (
    <>
      {console.log("App Render")}
      <Router>
        <AppRouting />
      </Router>
    </>
  );
}

export default App;
