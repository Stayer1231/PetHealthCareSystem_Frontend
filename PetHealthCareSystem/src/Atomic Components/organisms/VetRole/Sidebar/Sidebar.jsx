import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import Text from "../../../atoms/Text/Text";
import { Backdrop, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import useAuth from "../../../../config/provider/useAuth";

function Sidebar() {
	const { auth, setAuth } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

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

			<div className="vet-sidebar-container">
				<ul className="item-container">
					<li className="item">
						<Link to={"/work-schedule"}>
							<Text
								content={"Xem lịch làm"}
								type={"subtitle"}
								cursor={"pointer"}
							/>
						</Link>
					</li>
					<li className="item">
						<Link to={"/medical-record"}>
							<Text
								content={"Hồ sơ khám bệnh"}
								type={"subtitle"}
								cursor={"pointer"}
							/>
						</Link>
					</li>
					<li className="item">
						<Link to={"/hospitalize-record"}>
							<Text
								content={"Hồ sơ nhập viện"}
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

export default Sidebar;
