import React from "react";
import "./Header.scss";
import Logo from "../../../assets/img/dog_logo.jpg";
import { Link } from "react-router-dom";
import Text from "../../atoms/Text/Text";

function Header() {
  return (
    <header className="header-container">
      <div className="header-layout">
        <div className="logo-container">
          <Link to={"/"}>
            <img
              src={Logo}
              alt=""
            />
          </Link>
        </div>
        <nav className="nav-container">
          <ul className="nav-list">
            <Link
              to="/"
              className="nav-item"
            >
              <li className="nav-item">
                <Text
                  type="subtitle"
                  content="Home"
                  cursor="pointer"
                />
              </li>
            </Link>
            <Link
              to="/services"
              className="nav-item"
            >
              <li className="nav-item">
                <Text
                  type="subtitle"
                  content="Services"
                  cursor="pointer"
                />
              </li>
            </Link>
            <Link
              to="/your-pet/overview"
              className="nav-item"
            >
              <li className="nav-item">
                <Text
                  type="subtitle"
                  content="Your Pet"
                  cursor="pointer"
                />
              </li>
            </Link>
            {/* <Link
              to="/contact"
              className="nav-item"
            >
              <li className="nav-item">
                <Text
                  type="subtitle"
                  content="Contact"
                  cursor="pointer"
                />
              </li>
            </Link> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
