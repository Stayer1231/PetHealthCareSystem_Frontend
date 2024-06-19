import "./LoginPageTemplate.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginLogo from "../../../assets/img/dog_logo.jpg";
import AuthAPI from "../../../config/axios/AxiosAuth";
import Cookies from "js-cookie";
import useAuth from "../../../config/provider/useAuth";
import Toast from "../../molecules/ToasterNotification/ToasterNotification";

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
	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const from = location.state?.from?.pathname || "/";
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

	const loginWithUsername = async (username, password) => {
		try {
			setIsLoading(true);
			const response = await AuthAPI.post("authenticate", {
				username: usernameOrEmail,
				password: password,
			});

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

			Toast({
				message: "Login Successfully!",
				type: "success",
				title: "Success",
			});
		} catch (error) {
			Toast({
				message: error.response.data.message,
				type: "error",
				title: "Error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};

	// REDIRECT USER WHEN THEY ALREADY LOGGED IN
	useEffect(() => {
		if (auth?.role != null) {
			navigate(from, { replace: true });
		}

	}, []);

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
			>
				<div className="login__logo">
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
					content="Login"
					variant="filled"
					onClick={handleLogin}
					className="login__button"
					textColor="var(--LILY-WHITE)"
				/>

				<div className="login__check">
					<Link
						to="/forgot-password"
						className="login__forgot"
					>
						Forgot Password?
					</Link>
				</div>

				<div className="register-line">
					<Text
						type="p"
						content="Don't have an account?"
						className="login__register"
					/>
					<Link
						to="/register"
						className="login__register-link"
					>
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
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	);
};

export default LoginPageTemplate;
