import React from "react";
import "./LoginPage.scss";
import LoginImg from "../../../assets/img/background.jpg";
import LoginPageTemplate from "../../templates/LoginPageTemplate/LoginPageTemplate";

const LoginPage = () => {

  return (
    <div className="login">

      <img src={LoginImg} alt="login image" className="login__img" />

      <LoginPageTemplate />

    </div>
  );
};

export default LoginPage;
