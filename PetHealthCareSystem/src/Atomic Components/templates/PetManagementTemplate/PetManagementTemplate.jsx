import React from "react";
import Sidebar from "./../../organisms/Sidebar/Sidebar";
import "./PetManagementTemplate.scss";
import { Outlet } from "react-router-dom";

function PetManagementTemplate() {
	return (
		<>
			<div className="pet-management-container">
				<div>
					<Sidebar />
				</div>
				<div className="main-information-container">
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default PetManagementTemplate;
