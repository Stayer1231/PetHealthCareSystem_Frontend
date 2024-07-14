import "./CreateAccount.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../../../atoms/Text/Text";
import Button from "../../../../atoms/Button/Button";
import { Backdrop, CircularProgress } from "@mui/material";
import AuthAPI from "../../../../../config/axios/AxiosAuth";
import { RegisterValidation } from "../../../../../validate/Validation";
import useAuth from "../../../../../config/provider/useAuth";

const CreateAccount = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("2"); // Default role set to "2" (Staff)
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleRegisterValidation = () => {
    const data = {
      username,
      fullName,
      email,
      phone: phoneNumber,
      password,
      confirmPassword,
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
        confirmPassword,
      };

      console.log("Register Data: ", registerData); // Log the data being sent

      // Add the access token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`, // Include the token
        },
      };

      // Use the endpoint with the role as a query parameter
      const response = await AuthAPI.post(
        `register?role=${role}`,
        registerData,
        config
      );

      if (response && response.data) {
        console.log("Response Data: ", response.data); // Log the response data

        // Display success message
        alert(
          response.data.data ||
            "Registration successful! Please verify your email to activate your account."
        );

        // Navigate to the login page
        navigate("/login", { replace: true }); // Navigate to the login page after successful registration
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
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerError(error.response.data.message); // Set the server error message
      } else {
        setServerError(
          error.message || "An unexpected error occurred. Please try again."
        );
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
        className="register-account__form"
        onSubmit={handleSubmitRegister}
      >
        <Text
          type="title"
          content="Create Account"
          className="register-account__title"
        />
        <div className="register-account__content">
          {serverError && (
            <div className="server-error">
              <Text
                content={serverError}
                type="error"
                className="error-message"
              />
            </div>
          )}
          <div className="register-account__box">
            <div className="register-account__box-input">
              <Text
                type="label"
                content="Tên Đăng Nhập"
                htmlFor="register-account-username"
                className="register-account__label"
              />
              <input
                type="text"
                className="register-account__input"
                id="register-account-username"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
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
          <div className="register-account__box">
            <div className="register-account__box-input">
              <Text
                type="label"
                content="Họ và Tên"
                htmlFor="register-account-fullName"
                className="register-account__label"
              />
              <input
                type="text"
                className="register-account__input"
                id="register-account-fullName"
                placeholder=" "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
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
          <div className="register-account__box">
            <div className="register-account__box-input">
              <Text
                type="label"
                content="Email"
                htmlFor="register-account-email"
                className="register-account__label"
              />
              <input
                type="email"
                className="register-account__input"
                id="register-account-email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
          <div className="register-account__box">
            <div className="register-account__box-input">
              <Text
                type="label"
                content="Số điện thoại"
                htmlFor="register-account-phoneNumber"
                className="register-account__label"
              />
              <input
                type="text"
                className="register-account__input"
                id="register-account-phoneNumber"
                placeholder=" "
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoComplete="tel"
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
          <div className="register-account__box">
            <div className="register-account__box-input">
              <Text
                type="label"
                content="Mật khẩu"
                htmlFor="register-account-pass"
                className="register-account__label"
              />
              <input
                type="password"
                className="register-account__input"
                id="register-account-pass"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              {errors.password && (
                <Text
                  content={errors.password}
                  type={"secondary"}
                  className="error-message"
                />
              )}
            </div>
          </div>
          <div className="register-account__box">
            <div className="register-account__box-input">
              <Text
                type="label"
                content="Xác nhận mật khẩu"
                htmlFor="register-account-confirm-pass"
                className="register-account__label"
              />
              <input
                type="password"
                className="register-account__input"
                id="register-account-confirm-pass"
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <Text
                  content={errors.confirmPassword}
                  type={"secondary"}
                  className="error-message"
                />
              )}
            </div>
          </div>
          <div className="register-account__box">
            <div className="register-account__box-input">
              <Text
                type="label"
                content="Role"
                htmlFor="register-account-role"
                className="register-account__label"
              />
              <div className="register-account__radio-group">
                <div className="register-account__radio">
                  <input
                    type="radio"
                    id="role-staff"
                    name="role"
                    value="2"
                    checked={role === "2"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="role-staff">Staff</label>
                </div>
                <div className="register-account__radio">
                  <input
                    type="radio"
                    id="role-vet"
                    name="role"
                    value="3"
                    checked={role === "3"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="role-vet">Vet</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          content="Create Account"
          variant="filled"
          type="submit"
          className="register-account__button"
          textColor="var(--LILY-WHITE)"
        />
      </form>
    </>
  );
};

export default CreateAccount;
