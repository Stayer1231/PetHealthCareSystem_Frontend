import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { Link, useNavigate } from "react-router-dom";
import Text from "../../../atoms/Text/Text";
import { Backdrop, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import useAuth from "../../../../config/provider/useAuth";

function SideBar() {
	const { auth, setAuth } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		Cookies.remove("accessToken");
		Cookies.remove("fullName");
		Cookies.remove("username");
		Cookies.remove("password");
		Cookies.remove("refToken");
		Cookies.remove("role");	
		setAuth(null);
		navigate("/");
		window.location.reload();
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

			<div className="staff-sidebar-container">
				<ul className="item-container">
					<li className="item">
						<Link to={"/appointment-management"}>
							<Text
								content={"Quảng lý lịch hẹn"}
								type={"subtitle"}
								cursor={"pointer"}
							/>
						</Link>
					</li>

					<li className="item">
						<Link to={"/transaction-management"}>
							<Text
								content={"Quảng lý giao dịch"}
								type={"subtitle"}
								cursor={"pointer"}
							/>
						</Link>
					</li>

					<li className="item">
						<Text
							content={"Đăng xuất"}
							type={"subtitle"}
							className={"nav-item"}
							onClick={handleLogout}
							cursor={"pointer"}
						/>
					</li>
				</ul>
			</div>
		</>
	);
}

export default SideBar;
