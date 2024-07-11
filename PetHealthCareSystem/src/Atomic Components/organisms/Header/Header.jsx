import React, { useEffect, useState } from "react";
import "./Header.scss";
import Logo from "../../../assets/img/dog_logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import useAuth from "../../../config/provider/useAuth";
import Toast from "../../molecules/ToasterNotification/ToasterNotification";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";

function Header({ role }) {
	const [isLoading, setIsLoading] = useState(false);
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const isEmptyObject = (obj) => {
		return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
	};

	const handleLogout = () => {
		setIsLoading(true);
		Cookies.remove("accessToken");
		Cookies.remove("fullName");
		Cookies.remove("username");
		Cookies.remove("password");
		Cookies.remove("refToken");
		Cookies.remove("role");
		setAuth(null);

		sessionStorage.setItem("successMessage", "Đăng xuất thành công");

		setIsLoading(false);

		// Reload the page to apply changes of authentication
		if (location.pathname != "/") {
			navigate("/");
		} else {
			window.location.reload();
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
			<header className="header-container">
				<div className="header-layout">
					<div className="logo-container">
						<Link to={"/"}>
							<img
								src={Logo}
								alt=""
							/>
						</Link>
					</div>
					<nav className="nav-container">
						<ul className="nav-list">
							<Link
								to="/"
								className="nav-item"
							>
								<li className="nav-item">
									<Text
										type="subtitle"
										content="Trang chủ"
										cursor="pointer"
									/>
								</li>
							</Link>

							<Link
								to="/services"
								className="nav-item"
							>
								<li className="nav-item">
									<Text
										type="subtitle"
										content="Dịch vụ"
										cursor="pointer"
									/>
								</li>
							</Link>

							<Link
								to="/your-pet/overview"
								className="nav-item"
							>
								<li className="nav-item">
									<Text
										type="subtitle"
										content="Thú cưng"
										cursor="pointer"
									/>
								</li>
							</Link>

							{isEmptyObject(auth) && (
								<Link
									to="/login"
									className="nav-item"
								>
									<li className="nav-item">
										<Text
											type="subtitle"
											content="Đăng nhập"
											cursor="pointer"
										/>
									</li>
								</Link>
							)}

							{!isEmptyObject(auth) && (
								<Text
									content="Đăng xuất"
									type="subtitle"
									className="nav-item"
									onClick={handleLogout}
									cursor="pointer"
								/>
							)}
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
}

export default Header;
