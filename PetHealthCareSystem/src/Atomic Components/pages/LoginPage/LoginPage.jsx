import React, { useState } from "react";
import "./LoginPage.scss";
import { useNavigate, Link } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { message, notification } from "antd";

const LoginPage = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessageShown, setValidationMessageShown] = useState(false);

  const handleUsernameOrEmailChange = (event) => {
    setUsernameOrEmail(event.target.value);
    setValidationMessageShown(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setValidationMessageShown(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (usernameOrEmail.trim() === "" || password.trim() === "") {
      if (!validationMessageShown) {
        message.error(
          "Please fill in both username/email and password fields."
        );
        setValidationMessageShown(true);
      }
      return;
    }

    if (usernameOrEmail.includes("@")) {
      loginWithEmail(usernameOrEmail, password);
    } else {
      loginWithUsername(usernameOrEmail, password);
    }
  };

  const loginWithEmail = (email, password) => {
    notification.success({ message: "Login with email and password" });
    navigate("/your-pet/overview");
  };

  const loginWithUsername = (username, password) => {
    notification.success({ message: "Login with username and password" });
    navigate("/your-pet/overview");
  };

  return (
    <div className="login">
      <form action="" className="login__form">
        <div className="login__header">
          <Text type="h1" content="Login" className="login__title" />
        </div>

        <div className="login__content">
          <div className="login__box">
            <div className="login__box-input">
              <input
                type="text"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
                value={usernameOrEmail}
                onChange={handleUsernameOrEmailChange}
              />
              <Text
                type="label"
                content="Email or Username"
                htmlFor="login-email"
                className="login__label"
              />
            </div>
          </div>

          <div className="login__box">
            <div className="login__box-input">
              <input
                type="password"
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
              />
              <Text 
                type="label"
                content="Password"
                htmlFor="login-pass"
                className="login__label"
              />
            </div>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-group">
            <input
              type="checkbox"
              className="login__check-input"
              id="login-check"
            />
            <Text
              type="label"
              content="Remember me"
              htmlFor="login-check"
              className="login__check-label"
            />
          </div>

          <Link to="/forgot-password" className="login__forgot">
            Forgot Password?
          </Link>
        </div>

        <Button
          content="Login"
          variant="filled"
          onClick={handleLogin}
          className="login__button"
          textColor="var(--LILY-WHITE)"
        />

        <div className="register-line">
          <Text
            type="p"
            content="Don't have an account?"
            className="login__register"
          />
          <Link to="/register" className="login__register-link">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
