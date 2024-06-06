import React, { useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import Text from "./../../atoms/Text/Text";
import {
	LeftArrowBracket,
	RightArrowBracket,
} from "./../../../assets/Icon/Icon";

function Sidebar() {
	const [submenuActive, setSubmenuActive] = useState(false);

	// WHEN USER CLICK ON SUBMENU THEN SET THE ACTIVE TO TRUE
	const PetProfileMenuClicked = () => {
		setSubmenuActive(!submenuActive);
	};

	return (
		<div className="sidebar-container">
			<ul className="sidebar-items-list">
				<Link to="overview">
					<Text
						content={"Overview"}
						type={"subtitle"}
						className={"item"}
						cursor={"pointer"}
					/>
				</Link>
				{/* <Link to="pet-profiles"> */}
				<div className="pet-profile-menu">
					<div
						className={`flex justify-between cursor-pointer profile-menu-${
							submenuActive ? "active" : "inactive"
						}`}
						onClick={PetProfileMenuClicked}
					>
						<Text
							content={"Pet Profiles"}
							type={"subtitle"}
							className={"item"}
							cursor={"pointer"}
						/>

						<LeftArrowBracket className={"arrow-menu"} />
					</div>

					<div
						className={`pet-profile-submenu submenu-${
							submenuActive ? "active" : "inactive"
						}`}
					>
						<ul className="submenu-container">
							<li className="submenu-item">Con cho</li>
							<li className="submenu-item">Con meo</li>
						</ul>
					</div>
				</div>
				{/* </Link> */}
			</ul>
		</div>
	);
}

export default Sidebar;
