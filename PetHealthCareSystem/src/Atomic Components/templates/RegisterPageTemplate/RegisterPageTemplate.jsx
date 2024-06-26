import "./RegisterPageTemplate.scss";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import AuthAPI from "../../../config/axios/AxiosAuth";
import Toast from "../../molecules/ToasterNotification/ToasterNotification";
import LoginLogo from "../../../assets/img/dog_logo.jpg";

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

const RegisterPageTemplate = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationMessageShown, setValidationMessageShown] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("error");
	const [isErrorDisplayed, setIsErrorDisplayed] = useState(false); // New flag to track error display

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
		setValidationMessageShown(false);
	};

	const handleFullNameChange = (event) => {
		setFullName(event.target.value);
		setValidationMessageShown(false);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		setValidationMessageShown(false);
	};

	const handlePhoneNumberChange = (event) => {
		setPhoneNumber(event.target.value);
		setValidationMessageShown(false);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		setValidationMessageShown(false);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
		setValidationMessageShown(false);
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		if (
			username.trim() === "" ||
			fullName.trim() === "" ||
			email.trim() === "" ||
			phoneNumber.trim() === "" ||
			password.trim() === "" ||
			confirmPassword.trim() === ""
		) {
			if (!validationMessageShown) {
				Toast({
					message: "Please fill in all fields.",
					type: "error",
					title: "Error",
				});
				setValidationMessageShown(true);
			}
			return;
		}

		try {
			setIsLoading(true);
			const response = await AuthAPI.post("register", {
				username,
				fullName,
				email,
				phoneNumber,
				password,
				confirmPassword,
			});

			Toast({
				message: "Registration Successful!",
				type: "success",
				title: "Success",
			});
			navigate("/login");
		} catch (error) {
			let errorMessage = "An error occurred";

			if (error.response?.data) {
				const responseData = error.response.data;
				if (responseData.Message) {
					errorMessage = responseData.Message;
				} else if (responseData.errors) {
					const errorKeys = Object.keys(responseData.errors);
					if (errorKeys.length > 0) {
						errorMessage = errorKeys
							.map((key) => responseData.errors[key][0])
							.join("\n");
					}
				}
			}

			Toast({
				message: errorMessage,
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
		setValidationMessageShown(false);
		setIsErrorDisplayed(false);
	};

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
				className="register__form"
			>
				<div className="register__logo">
					<img
						src={LoginLogo}
						alt="register image"
						className="register__logo-img"
					/>
				</div>
				<div className="register__content">
					<div className="register__box">
						<div className="register__box-input">
							<input
								type="text"
								required
								className="register__input"
								id="register-username"
								placeholder=" "
								value={username}
								onChange={handleUsernameChange}
							/>
							<Text
								type="label"
								content="Tên tài khoản"
								htmlFor="register-username"
								className="register__label"
							/>
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type="text"
								required
								className="register__input"
								id="register-fullName"
								placeholder=" "
								value={fullName}
								onChange={handleFullNameChange}
							/>
							<Text
								type="label"
								content="Họ và Tên"
								htmlFor="register-fullName"
								className="register__label"
							/>
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type="email"
								required
								className="register__input"
								id="register-email"
								placeholder=" "
								value={email}
								onChange={handleEmailChange}
							/>
							<Text
								type="label"
								content="Email"
								htmlFor="register-email"
								className="register__label"
							/>
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type="text"
								required
								className="register__input"
								id="register-phoneNumber"
								placeholder=" "
								value={phoneNumber}
								onChange={handlePhoneNumberChange}
							/>
							<Text
								type="label"
								content="Số điện thoại"
								htmlFor="register-phoneNumber"
								className="register__label"
							/>
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type={showPassword ? "text" : "password"}
								required
								className="register__input"
								id="register-pass"
								placeholder=" "
								value={password}
								onChange={handlePasswordChange}
							/>
							<Text
								type="label"
								content="Mật khẩu"
								htmlFor="register-pass"
								className="register__label"
							/>
							<IconButton
								onClick={togglePasswordVisibility}
								className="password-toggle-btn"
								sx={{ width: 15, height: 15 }}
							>
								{showPassword ? (
									<Visibility sx={{ width: 15, height: 15 }} />
								) : (
									<VisibilityOff sx={{ width: 15, height: 15 }} />
								)}
							</IconButton>
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type={showConfirmPassword ? "text" : "password"}
								required
								className="register__input"
								id="register-confirm-pass"
								placeholder=" "
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
							/>
							<Text
								type="label"
								content="Xác nhận mật khẩu"
								htmlFor="register-confirm-pass"
								className="register__label"
							/>
							<IconButton
								onClick={toggleConfirmPasswordVisibility}
								className="password-toggle-btn"
								sx={{ width: 15, height: 15 }}
							>
								{showConfirmPassword ? (
									<Visibility sx={{ width: 15, height: 15 }} />
								) : (
									<VisibilityOff sx={{ width: 15, height: 15 }} />
								)}
							</IconButton>
						</div>
					</div>
				</div>

				<Button
					content="Đăng ký"
					variant="filled"
					onClick={handleRegister}
					className="register__button"
					textColor="var(--LILY-WHITE)"
				/>

				<div className="register-line">
					<Text
						type="p"
						content="Bạn đã có tài khoản?"
						className="register__login"
					/>
					<Link
						to="/login"
						className="register__login-link"
					>
						Đăng nhập
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

export default RegisterPageTemplate;
