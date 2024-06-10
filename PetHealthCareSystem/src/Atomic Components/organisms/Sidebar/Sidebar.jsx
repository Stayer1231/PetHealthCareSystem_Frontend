import React, { useState } from "react";
import "./Sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import Text from "./../../atoms/Text/Text";
import {
	LeftArrowBracket,
	RightArrowBracket,
} from "./../../../assets/Icon/Icon";
import { Modal, ModalBody, ModalHeader } from "../../molecules/Modal/Modal";

function Sidebar() {
	const [submenuActive, setSubmenuActive] = useState(false);
	const location = useLocation();
	// OPENING ADD PET MODAL
	const [showAddPetModal, setShowAddPetModal] = useState(false);

	const isActive = (path) => location.pathname === path;
	const isSubmenuActive = (paths) => paths.some((path) => isActive(path));

	// WHEN USER CLICK ON SUBMENU THEN SET THE ACTIVE TO TRUE
	const PetProfileMenuClicked = () => {
		setSubmenuActive(!submenuActive);
	};

	// === PET MODAL ===
	const openAddPetModal = () => {
		setShowAddPetModal(true);

	}

	const closeAddPetModal = () => {
		setShowAddPetModal(false);
	}

	return (
		<div className="sidebar-container">
			<ul className="sidebar-items-list">
				<Link
					to="overview"
					className={`${isActive("/your-pet/overview") ? "active-tab" : ""}`}
				>
					<Text
						content={"Overview"}
						type={"subtitle"}
						className={`item`}
						cursor={"pointer"}
					/>
				</Link>

				{/* <Link to="pet-profiles"> */}
				<div className="pet-profile-menu">
					<div
						className={`flex justify-between cursor-pointer profile-menu-${submenuActive ? "active" : "inactive"
							} ${isSubmenuActive}`}
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
						className={`pet-profile-submenu submenu-${submenuActive ? "active" : "inactive"
							}`}
					>
						<ul className="submenu-container">
							<Link
								to="/your-pet/pet-profile/Id=1"
								className={`${isActive("/your-pet/pet-profile/Id=1") ? "active-sub-tab" : ""
									} submenu-item`}
							>
								<Text
									content={"Courage"}
									type={"subtitle"}
									className={"item"}
									cursor={"pointer"}
								/>
							</Link>
							<Link
								to="/your-pet/pet-profile/Id=2"
								className={`${isActive("/your-pet/pet-profile/Id=2") ? "active-sub-tab" : ""
									} submenu-item`}
							>
								<Text
									content={"Courage"}
									type={"subtitle"}
									className={"item"}
									cursor={"pointer"}
								/>
							</Link>
							<Text content={"Add new pet"} className={"submenu-item"} onClick={openAddPetModal} />
						</ul>
					</div>
				</div>
			</ul>
			<Modal onHide={closeAddPetModal} show={showAddPetModal} size={"sm"}>
				<ModalHeader />
				<ModalBody>
					<div className="add-pet-container">
						<div className="modal-title">
							<Text content={"Lets Get Started!"} type={"h3"} />
						</div>
						<div className="adding-information-container">
							{/* PET NAME */}
							<div className="pet-name input-div">
								<Text content={"What is your pet's name?"} />
								<input
									type="text"
									className="general-input-field"
								/>
							</div>

							{/* PET ROLE */}
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default Sidebar;
