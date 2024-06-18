import React from "react";
import "./LoginPage.scss";
import LoginImg from "../../../assets/img/background.jpg";
import LoginPageTemplate from "../../templates/LoginPageTemplate/LoginPageTemplate";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../config/provider/useAuth";
import Cookies from "js-cookie";

const LoginPage = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();

	const handleFakeStaffLogin = () => {
		const role = "Staff";
		Cookies.set("role", role);
		setAuth({ role });

		navigate("/");
		window.location.reload();
	};

	return (
		<div className="login">
			<img
				src={LoginImg}
				alt="login image"
				className="login__img"
			/>
			<div style={{ zIndex: 10000 }}>
				<button
					type="button"
					onClick={handleFakeStaffLogin}
				>
					Go Staff Page
				</button>
			</div>
			<LoginPageTemplate />
		</div>
	);
};

export default LoginPage;
