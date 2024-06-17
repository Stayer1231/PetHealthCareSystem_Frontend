import React from "react";
import "./Header.scss";
import Logo from "../../../assets/img/dog_logo.jpg";
import { Link } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import useAuth from "../../../config/provider/useAuth";
import Toast from "../../molecules/ToasterNotification/ToasterNotification";
import Cookies from "js-cookie";

function Header() {
	const { auth, setAuth } = useAuth();

	const isEmptyObject = (obj) => {
		return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
	};

	const handleLogout = () => {
		Cookies.remove("accessToken");
		Cookies.remove("fullName");
		Cookies.remove("username");
		Cookies.remove("password");
		Cookies.remove("refToken");
		Cookies.remove("role");
		setAuth(null);
		Toast({
			title: "Success",
			message: "Logout Successfully!",
			type: "success",
		});
	};

	return (
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
									content="Home"
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
									content="Services"
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
									content="Your Pet"
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
										content="Login"
										cursor="pointer"
									/>
								</li>
							</Link>
						)}

						{!isEmptyObject(auth) && (
							<Text
								content={"Logout"}
								type={"subtitle"}
								className={"nav-item"}
								onClick={handleLogout}
								cursor={"pointer"}
							/>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
