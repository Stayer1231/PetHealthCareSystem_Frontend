import React, { useState } from "react";
import "./Sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import Text from "./../../atoms/Text/Text";
import {
	AddIcon,
	LeftArrowBracket,
	RightArrowBracket,
} from "./../../../assets/Icon/Icon";
import { Modal, ModalBody, ModalHeader } from "../../molecules/Modal/Modal";
import Button from "../../atoms/Button/Button";

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
	};

	const closeAddPetModal = () => {
		setShowAddPetModal(false);
	};

	return (
		<div className="sidebar-container">
			<ul className="sidebar-items-list">
				{/* PET OVERVIEW */}
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

				{/* USER ACCOUNT */}
				<Link
					to="my-account"
					className={`${isActive("/your-pet/my-account") ? "active-tab" : ""}`}
				>
					<Text
						content={"My Account"}
						type={"subtitle"}
						className={`item`}
						cursor={"pointer"}
					/>
				</Link>

				{/* <Link to="pet-profiles"> */}
				<div className="pet-profile-menu">
					<div
						className={`flex justify-between cursor-pointer profile-menu-${
							submenuActive ? "active" : "inactive"
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
						className={`pet-profile-submenu submenu-${
							submenuActive ? "active" : "inactive"
						}`}
					>
						<ul className="submenu-container">
							<Link
								to="/your-pet/pet-profile/Id=1"
								className={`${
									isActive("/your-pet/pet-profile/Id=1") ? "active-sub-tab" : ""
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
								className={`${
									isActive("/your-pet/pet-profile/Id=2") ? "active-sub-tab" : ""
								} submenu-item`}
							>
								<Text
									content={"Courage"}
									type={"subtitle"}
									className={"item"}
									cursor={"pointer"}
								/>
							</Link>
							<div className="add-pet-btn">
								<Button
									content="Add Pet"
									onClick={openAddPetModal}
									variant="transparent"
									className={"add-btn"}
									rightIcon={<AddIcon />}
									stroke
								/>
							</div>
						</ul>
					</div>
				</div>
			</ul>

			{/* ADD PET MODAL */}
			<Modal
				onHide={closeAddPetModal}
				show={showAddPetModal}
				size={"sm"}
			>
				<ModalHeader />
				<ModalBody>
					<div className="add-pet-container">
						<div className="modal-title">
							<Text
								content={"Lets Get Started!"}
								type={"h3"}
							/>
						</div>
						<div className="adding-information-container">
							{/* PET NAME */}
							<div className="pet-name input-div">
								<Text
									content={"What is your pet's name?"}
									className={"field-label required-field"}
								/>
								<input
									type="text"
									className="general-input-field"
								/>
							</div>

							{/* PET ROLE */}
							<div className="pet-role input-div">
								<Text
									content={"Assign my pet as?"}
									className={"field-label required-field"}
								/>
								<input
									type="text"
									className="general-input-field"
								/>
							</div>

							{/* PET BREED */}
							<div className="pet-breed input-div">
								<Text
									content={"What breed is your pet?"}
									className={"field-label required-field"}
								/>
								<input
									type="text"
									className="general-input-field"
								/>
							</div>

							{/* PET DOB */}
							<div className="pet-dob input-div">
								<Text
									content={"What is your pet's date of birth?"}
									className={"field-label required-field"}
								/>
								<input
									type="date"
									className="general-input-field"
								/>
							</div>

							{/* PET GENDER */}
							<div className="pet-gender input-div">
								<Text
									content={"What is your pet's date of birth?"}
									className={"field-label required-field"}
								/>
								<select
									name=""
									id=""
									className="general-input-field"
								>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>

							{/* PET NEUTERED */}
							<div className="pet-neutered input-div">
								<Text
									content={"Has your pet been neutered?"}
									className={"field-label required-field"}
								/>
								<select
									name=""
									id=""
									className="general-input-field"
								>
									<option value="yes">Yes</option>
									<option value="no">No</option>
								</select>
							</div>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default Sidebar;
