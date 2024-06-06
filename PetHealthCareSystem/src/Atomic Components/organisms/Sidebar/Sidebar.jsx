import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import Text from "./../../atoms/Text/Text";

function Sidebar() {
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
				<Link to="pet-profiles">
					<Text
						content={"Pet Profiles"}
						type={"subtitle"}
						className={"item"}
						cursor={"pointer"}
					/>
				</Link>
			</ul>
		</div>
	);
}

export default Sidebar;
