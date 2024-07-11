import "./LoginPageTemplate.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginLogo from "../../../assets/img/dog_logo.jpg";
import AuthAPI from "../../../config/axios/AxiosAuth";
import { LoginValidation } from "../../../validate/Validation";
import Cookies from "js-cookie";
import useAuth from "../../../config/provider/useAuth";

const Alert = React.forwardRef(function Alert(props, ref) {
	return (
		<MuiAlert
			elevation={6}
			ref={ref}
			variant="filled"
			{...props}
		/>
	);
});

const LoginPageTemplate = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const from = location.state?.from?.pathname || "/";
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleLogoClick = () => {
		navigate("/");
	};

	const handleLoginValidation = (data) => {
		const errors = LoginValidation(data);
		console.log(errors);
		setErrors(errors);
	};

	// HANDLE SUBMIT LOGIN FORM
	const handleSubmitLogin = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		try {
			setIsLoading(true);
			const response = await AuthAPI.post("authenticate", loginData);

			let userId = response?.data?.id;
			let accessToken = response?.data?.token;
			let role = response?.data?.role[0];
			let fullName = response?.data?.fullName;
			let userName = response?.data?.userName;
			let refToken = response?.data?.refreshToken;

			Cookies.set("accessToken", accessToken);
			Cookies.set("fullName", fullName);
			Cookies.set("username", userName);
			Cookies.set("refToken", refToken);
			Cookies.set("role", role);
			Cookies.set("userId", userId);

			setAuth({ accessToken, fullName, userName, refToken, role, userId });
			navigate(from, { replace: true });
		} catch (error) {
			console.error(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	// REDIRECT USER WHEN THEY ALREADY LOGGED IN
	// useEffect(() => {
	// 	if (auth?.role != null) {
	// 		navigate(from, { replace: true });
	// 	}
	// }, []);

	return (
		<>
			{isLoading && (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={isLoading}
				>
					<div className="flex flex-col justify-center items-center gap-2">
						<CircularProgress color="inherit" />
						<h1>Waiting</h1>
					</div>
				</Backdrop>
			)}
			<form
				action=""
				className="login__form"
				onSubmit={handleSubmitLogin}
			>
				<div
					className="login__logo"
					onClick={handleLogoClick}
				>
					<img
						src={LoginLogo}
						alt="login image"
						className="login__logo-img"
					/>
				</div>

				<div className="login__content">
					<div className="login__box">
						<div className="login__box-input">
							<input
								type="text"
								className="login__input"
								id="login-email"
								placeholder=""
								value={loginData.username}
								onChange={(e) =>
									setLoginData({ ...loginData, username: e.target.value })
								}
							/>
							<Text
								type="label"
								content="Tên đăng nhập hoặc Email"
								htmlFor="login-email"
								className="login__label"
							/>

							{errors.username && loginData.username == "" && (
								<Text
									content={errors.username}
									type={"secondary"}
									className="error-message"
								/>
							)}
						</div>
					</div>

					<div className="login__box">
						<div className="login__box-input">
							<input
								type={showPassword ? "text" : "password"}
								className="login__input"
								id="login-pass"
								placeholder=" "
								value={loginData.password}
								onChange={(e) =>
									setLoginData({ ...loginData, password: e.target.value })
								}
							/>
							<Text
								type="label"
								content="Mật khẩu"
								htmlFor="login-pass"
								className="login__label"
							/>

							{errors.password && loginData.password == "" && (
								<Text
									content={errors.password}
									type={"secondary"}
									className="error-message"
								/>
							)}
							<IconButton
								onClick={togglePasswordVisibility}
								className="password-toggle-btn"
								sx={{ width: 15, height: 15 }}
							>
								{showPassword ? (
									<VisibilityOff sx={{ width: 15, height: 15 }} />
								) : (
									<Visibility sx={{ width: 15, height: 15 }} />
								)}
							</IconButton>
						</div>
					</div>
				</div>

				<Button
					content="Đăng nhập"
					variant="filled"
					className="login__button"
					textColor="var(--LILY-WHITE)"
					type={"submit"}
					onClick={() => handleLoginValidation(loginData)}
				/>

				<div className="login__check">
					<Link
						to="/forgot-password"
						className="login__forgot"
					>
						Quên mật khẩu?
					</Link>
				</div>

				<div className="login-register-line">
					<Text
						type="p"
						content="Bạn chưa có tài khoản?"
						className="login__register"
					/>
					<Link
						to="/register"
						className="login__register-link"
					>
						Đăng ký
					</Link>
				</div>
			</form>
			<Text
				type="primary"
				className="copyright"
				content="Copyright © Peticine 2024"
			/>
		</>
	);
};

export default LoginPageTemplate;
