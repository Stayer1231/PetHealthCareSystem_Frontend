import React, { useState } from "react";
import "./LoginPage.scss";
import { useNavigate, Link } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginImg from "../../../assets/img/background.jpg";
import LoginLogo from "../../../assets/img/dog_logo.jpg";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessageShown, setValidationMessageShown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        setSnackbarMessage(
          "Please fill in both username/email and password fields."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
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
    setSnackbarMessage("Login with email and password");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    navigate("/");
  };

  const loginWithUsername = (username, password) => {
    setSnackbarMessage("Login with username and password");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    navigate("/");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="login">

      <img src={LoginImg} alt="login image" className="login__img" />

      <form action="" className="login__form">
        
        <div className="login__logo">
          <img src={LoginLogo} alt="login image" className="login__logo-img" />
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
                type={showPassword ? "text" : "password"}
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
              <IconButton
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
                sx={{ width: 15, height: 15 }}
              >
                {showPassword ? <VisibilityOff sx={{ width: 15, height: 15 }} /> : <Visibility sx={{ width: 15, height: 15 }} />}
              </IconButton>
            </div>
          </div>
        </div>

        <Button
          content="Login"
          variant="filled"
          onClick={handleLogin}
          className="login__button"
          textColor="var(--LILY-WHITE)"
        />

        <div className="login__check">
          <Link to="/forgot-password" className="login__forgot">
            Forgot Password?
          </Link>
        </div>

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
      <Text
        type="primary"
        className="copyright"
        content="Copyright © Peticine 2024"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
