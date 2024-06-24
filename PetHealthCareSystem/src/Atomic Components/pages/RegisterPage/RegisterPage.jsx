import React from 'react'
import "./RegisterPage.scss"
import RegisterPageTemplate from "../../templates/RegisterPageTemplate/RegisterPageTemplate"
import LoginImg from "../../../assets/img/background.jpg";

const RegisterPage = () => {
    

  return (
    <div className="register">
        <img
				src={LoginImg}
				alt="login image"
				className="login__img"
			/>
      <RegisterPageTemplate />
    </div>
  )
}

export default RegisterPage