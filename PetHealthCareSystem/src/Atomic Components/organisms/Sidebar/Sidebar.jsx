import React, { useEffect, useState } from "react";
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
import APIInUse from "./../../../config/axios/AxiosInUse";
import { Backdrop, CircularProgress } from "@mui/material";

function Sidebar() {
	const [isLoading, setIsLoading] = useState(false);
	const [submenuActive, setSubmenuActive] = useState(false);
	const location = useLocation();
	const [petList, setPetList] = useState(null);
	const [petData, setPetData] = useState({
		name: "",
		species: "",
		breed: "",
		gender: "",
		dateOfBirth: "",
		isNeutered: null,
	});

	// OPENING ADD PET MODAL
	const [showAddPetModal, setShowAddPetModal] = useState(false);

	const isActive = (path) => location.pathname === path;
	const isSubmenuActive = (paths) => paths.some((path) => isActive(path));

	// WHEN USER CLICK ON SUBMENU THEN SET THE ACTIVE TO TRUE
	const PetProfileMenuClicked = () => {
		setSubmenuActive(!submenuActive);
	};

	// HANDLE SUBMIT ADD PET FORM
	const handleAddPet = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await APIInUse.post("Pet/AddPet", petData);
			window.location.reload();
		} catch (error) {
			console.log(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	// === PET MODAL ===
	const openAddPetModal = () => {
		setShowAddPetModal(true);
	};

	const closeAddPetModal = () => {
		setShowAddPetModal(false);
	};

	// USE EFFECT SCOPE
	// GET PET LIST
	useEffect(() => {
		const getPetList = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get("Pet/GetAllPetsForCustomer");
				setPetList(response.data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getPetList();
	}, []);

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
						className={`${
							isActive("/your-pet/my-account") ? "active-tab" : ""
						}`}
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
								{petList?.length > 0
									? petList.map((pet) => (
											<Link
												to={`/your-pet/pet-profile/${pet?.id}`}
												className={`${
													isActive(`/your-pet/pet-profile/${pet?.id}`)
														? "active-sub-tab"
														: ""
												} submenu-item`}
											>
												<Text
													content={pet?.name}
													type={"subtitle"}
													className={"item"}
													cursor={"pointer"}
												/>
											</Link>
									  ))
									: null}
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
							<form onSubmit={handleAddPet}>
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
											value={petData.name}
											placeholder="Enter your pet's name"
											onChange={(e) =>
												setPetData((prev) => ({
													...prev,
													name: e.target.value,
												}))
											}
										/>
									</div>

									{/* PET SPECIES */}
									<div className="pet-role input-div">
										<Text
											content={"Assign my pet as?"}
											className={"field-label required-field"}
										/>
										<select
											className="general-input-field"
											value={petData.species}
											onChange={(e) =>
												setPetData((prev) => ({
													...prev,
													species: e.target.value,
												}))
											}
										>
											<option
												value=""
												disabled
											>
												Select role of your pet
											</option>
											<option value="dog">Dog</option>
											<option value="cat">Cat</option>
										</select>
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
											value={petData.breed}
											placeholder="Enter your pet's breed"
											onChange={(e) =>
												setPetData((prev) => ({
													...prev,
													breed: e.target.value,
												}))
											}
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
											value={petData.dateOfBirth}
											onChange={(e) =>
												setPetData((prev) => ({
													...prev,
													dateOfBirth: e.target.value,
												}))
											}
										/>
									</div>

									{/* PET GENDER */}
									<div className="pet-gender input-div">
										<Text
											content={"What is your pet's gender?"}
											className={"field-label required-field"}
										/>
										<select
											className="general-input-field"
											value={petData.gender}
											onChange={(e) =>
												setPetData((prev) => ({
													...prev,
													gender: e.target.value,
												}))
											}
										>
											<option
												value=""
												disabled
											>
												What is your pet gender
											</option>
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
											value={
												petData.isNeutered === null ? "" : petData.isNeutered
											}
											onChange={(e) =>
												setPetData((prev) => ({
													...prev,
													isNeutered: JSON.parse(e.target.value),
												}))
											}
										>
											<option
												value=""
												disabled
											>
												Is your pet neutered
											</option>
											<option value={true}>Yes</option>
											<option value={false}>No</option>
										</select>
									</div>
								</div>

								{/* BTN CONTAINER */}
								<div className="action-btn-container">
									<Button
										content="Save"
										variant="filled"
										className={"btn"}
										onClick={closeAddPetModal}
										type={"submit"}
									/>
									<Button
										content="Cancel"
										variant="transparent"
										className={"btn"}
										onClick={closeAddPetModal}
									/>
								</div>
							</form>
						</div>
					</ModalBody>
				</Modal>
			</div>
		</>
	);
}

export default Sidebar;
