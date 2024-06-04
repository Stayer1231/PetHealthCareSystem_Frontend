import React from "react";
import Logo from "../../../assets/img/dog_logo.jpg";
import "./Footer.scss";
import Text from "./../../atoms/Text/Text";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-layout">
        <div className="footer-content">
          <Text
            content="Copyright © Peticine 2024"
            type="subtitle"
            className="copyright"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
