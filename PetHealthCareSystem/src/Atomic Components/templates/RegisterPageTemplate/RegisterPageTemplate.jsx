import "./RegisterPageTemplate.scss";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthAPI from "../../../config/axios/AxiosAuth";
import LoginLogo from "../../../assets/img/dog_logo.jpg";
import { RegisterValidation } from "../../../validate/Validation";
import useAuth from "../../../config/provider/useAuth";

const RegisterPageTemplate = () => {
	const navigate = useNavigate();
	const { setAuth } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [serverError, setServerError] = useState(""); // Add server error state

	const handleLogoClick = () => {
		navigate('/'); // Navigate to the home page URL ("/")
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleRegisterValidation = () => {
		const data = {
			username,
			fullName,
			email,
			phone: phoneNumber,
			password,
			confirmPassword
		};
		const errors = RegisterValidation(data);
		setErrors(errors);
		return errors;
	};

	const handleSubmitRegister = async (e) => {
		e.preventDefault();
	
		const errors = handleRegisterValidation();
		if (Object.keys(errors).length > 0) return;
	
		try {
			setIsLoading(true);
			const registerData = { 
				userName: username, 
				fullName, 
				email, 
				phoneNumber, 
				password, 
				confirmPassword 
			};
	
			console.log("Register Data: ", registerData);  // Log the data being sent
	
			// Use the endpoint without duplicating the base URL path
			const response = await AuthAPI.post("register", registerData);
	
			if (response && response.data) {
				console.log("Response Data: ", response.data);  // Log the response data
	
				// Display success message
				alert(response.data.data || "Registration successful! Please verify your email to activate your account.");
	
				// Navigate to the login page
				navigate("/login", { replace: true });  // Navigate to the login page after successful registration
			} else {
				console.error("Unexpected response structure:", response);
			}
		} catch (error) {
			console.error("Registration error:", error);
			if (error.response) {
				console.error("Error response data: ", error.response.data);
				console.error("Error response status: ", error.response.status);
				console.error("Error response headers: ", error.response.headers);
			}
			if (error.response && error.response.data && error.response.data.message) {
				setServerError(error.response.data.message);  // Set the server error message
			} else {
				setServerError(error.message || "An unexpected error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
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
				onSubmit={handleSubmitRegister}
			>
				<div className="register__logo" onClick={handleLogoClick}>
					<img
						src={LoginLogo}
						alt="register image"
						className="register__logo-img"
					/>
				</div>
				<div className="register__content">
					{serverError && (
						<div className="server-error">
							<Text
								content={serverError}
								type="error"
								className="error-message"
							/>
						</div>
					)}
					<div className="register__box">
						<div className="register__box-input">
							<input
								type="text"
								className="register__input"
								id="register-username"
								placeholder=" "
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								autoComplete="username"
							/>
							<Text
								type="label"
								content="Tên tài khoản"
								htmlFor="register-username"
								className="register__label"
							/>
							{errors.username && (
								<Text
									content={errors.username}
									type={"secondary"}
									className="error-message"
								/>
							)}
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type="text"
								className="register__input"
								id="register-fullName"
								placeholder=" "
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								autoComplete="name"
							/>
							<Text
								type="label"
								content="Họ và Tên"
								htmlFor="register-fullName"
								className="register__label"
							/>
							{errors.fullName && (
								<Text
									content={errors.fullName}
									type={"secondary"}
									className="error-message"
								/>
							)}
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type="email"
								className="register__input"
								id="register-email"
								placeholder=" "
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
							/>
							<Text
								type="label"
								content="Email"
								htmlFor="register-email"
								className="register__label"
							/>
							{errors.email && (
								<Text
									content={errors.email}
									type={"secondary"}
									className="error-message"
								/>
							)}
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type="text"
								className="register__input"
								id="register-phoneNumber"
								placeholder=" "
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								autoComplete="tel"
							/>
							<Text
								type="label"
								content="Số điện thoại"
								htmlFor="register-phoneNumber"
								className="register__label"
							/>
							{errors.phone && (
								<Text
									content={errors.phone}
									type={"secondary"}
									className="error-message"
								/>
							)}
						</div>
					</div>
					<div className="register__box">
						<div className="register__box-input">
							<input
								type={showPassword ? "text" : "password"}
								className="register__input"
								id="register-pass"
								placeholder=" "
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="new-password"
							/>
							<Text
								type="label"
								content="Mật khẩu"
								htmlFor="register-pass"
								className="register__label"
							/>
							{errors.password && (
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
								className="register__input"
								id="register-confirm-pass"
								placeholder=" "
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								autoComplete="new-password"
							/>
							<Text
								type="label"
								content="Xác nhận mật khẩu"
								htmlFor="register-confirm-pass"
								className="register__label"
							/>
							{errors.confirmPassword && (
								<Text
									content={errors.confirmPassword}
									type={"secondary"}
									className="error-message"
								/>
							)}
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
					type="submit"
					className="register__button"
					textColor="var(--LILY-WHITE)"
				/>

				<div className="register-register-line">
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
		</>
	);
};

export default RegisterPageTemplate;
