import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import Text from "./../../atoms/Text/Text";
import { AddIcon, LeftArrowBracket } from "./../../../assets/Icon/Icon";
import { Modal, ModalBody, ModalHeader } from "../../molecules/Modal/Modal";
import Button from "../../atoms/Button/Button";
import APIInUse from "./../../../config/axios/AxiosInUse";
import { Backdrop, CircularProgress } from "@mui/material";
import { CreatePetValidation } from "../../../validate/Validation";
import Toast from "../../molecules/ToasterNotification/ToasterNotification";
import { CatBreeds } from "../../../TestData/AnimalBreed/CatBreeds";
import { DogBreeds } from "../../../TestData/AnimalBreed/DogBreeds";

function Sidebar() {
	const [isLoading, setIsLoading] = useState(false);
	const [submenuActive, setSubmenuActive] = useState(false);
	const location = useLocation();
	const [petList, setPetList] = useState(null);
	const [submenuHeight, setSubmenuHeight] = useState(0);
	const submenuRef = useRef(null);
	const [catBreedList, setCatBreedList] = useState([]);
	const [dogBreedList, setDogBreedList] = useState([]);
	const [errors, setErrors] = useState({});
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
		if (!submenuActive) {
			setSubmenuHeight(submenuRef.current.scrollHeight);
		} else {
			setSubmenuHeight(0);
		}
	};

	// HANDLE VALIDATE ADD PET FORM
	const handleValidateAddPet = (data) => {
		const error = CreatePetValidation(data);
		setErrors(error);
	};

	// HANDLE SUBMIT ADD PET FORM
	const handleAddPet = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		try {
			setIsLoading(true);
			await APIInUse.post("Pet/customer/add", petData);
			sessionStorage.setItem("successMessage", "Tạo mới thú cưng thành công");
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
			setIsLoading(true);
			try {
				const response = await APIInUse.get("Pet/customer/all");
				setPetList(response.data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getPetList();
	}, []);

	// GET SUCCESS MESSAGE FROM SESSION
	useEffect(() => {
		if (sessionStorage.getItem("successMessage")) {
			Toast({
				type: "Success",
				title: "Thành công",
				message: sessionStorage.getItem("successMessage"),
			});
			sessionStorage.removeItem("successMessage");
		}
	}, []);

	// GET ANIMAL BREED LIST
	useEffect(() => {
		setCatBreedList(CatBreeds);
		setDogBreedList(DogBreeds);
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
							content={"Tổng Quan"}
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
							content={"Tài Khoản Của Tôi"}
							type={"subtitle"}
							className={`item`}
							cursor={"pointer"}
						/>
					</Link>

					{/* USER APPOINTMENT */}
					<Link
						to="my-appointments"
						className={`${
							isActive("/your-pet/my-appointments") ? "active-tab" : ""
						}`}
					>
						<Text
							content={"Lịch Hẹn Của Tôi"}
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
								content={"Hồ Sơ Thú Cưng"}
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
							ref={submenuRef}
							style={{ height: `${submenuHeight}px` }}
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
							</ul>
							<div className="add-pet-btn">
								<Button
									content="Thêm Thú Cưng"
									onClick={openAddPetModal}
									variant="transparent"
									className={"add-btn"}
									rightIcon={<AddIcon />}
									stroke
								/>
							</div>
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
									content={"Bắt Đầu Thêm Thú Cưng!"}
									type={"h3"}
								/>
							</div>
							<form onSubmit={handleAddPet}>
								<div className="adding-information-container">
									{/* PET NAME */}
									<div className="pet-name input-div">
										<Text
											content={"Tên thú cưng của bạn là gì?"}
											className={"field-label required-field"}
										/>
										<input
											type="text"
											className="general-input-field"
											value={petData.name}
											placeholder="Tên thú cưng..."
											onChange={(e) =>
												setPetData((prev) => ({
													...prev,
													name: e.target.value,
												}))
											}
										/>

										{errors.name && petData.name == "" && (
											<Text
												content={errors.name}
												type={"secondary"}
												className={"text-red-500"}
											/>
										)}
									</div>

									{/* PET SPECIES */}
									<div className="pet-role input-div">
										<Text
											content={"Thú cưng của tôi là?"}
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
												--Chọn loại thú cưng--
											</option>
											<option value="dog">Chó</option>
											<option value="cat">Mèo</option>
										</select>

										{errors.species && petData.species == "" && (
											<Text
												content={errors.species}
												type={"secondary"}
												className={"text-red-500"}
											/>
										)}
									</div>

									{/* PET BREED */}
									<div className="pet-breed input-div">
										<Text
											content={"Giống thú cưng của bạn là gì?"}
											className={"field-label required-field"}
										/>
										<select
											name=""
											id=""
											className="general-input-field"
											onChange={(e) =>
												setPetData((prev) => ({
													...prev,
													breed: e.target.value,
												}))
											}
										>
											<option
												disabled
												selected
												value={"--Vui lòng chọn giống thú cưng--"}
											>
												--Vui lòng chọn giống thú cưng--
											</option>
											{petData.species.toLowerCase() === "dog"
												? dogBreedList.map((breed) => (
														<option value={breed}>{breed}</option>
												  ))
												: petData.species.toLowerCase() == "cat"
												? catBreedList.map((breed) => (
														<option value={breed}>{breed}</option>
												  ))
												: null}
										</select>

										{errors.breed && petData.breed == "" && (
											<Text
												content={errors.breed}
												type={"secondary"}
												className={"text-red-500"}
											/>
										)}
									</div>

									{/* PET DOB */}
									<div className="pet-dob input-div">
										<Text
											content={"Sinh nhật của thú cưng của bạn là ngày nào?"}
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

										{errors.dateOfBirth && petData.dateOfBirth == "" && (
											<Text
												content={errors.dateOfBirth}
												type={"secondary"}
												className={"text-red-500"}
											/>
										)}
									</div>

									{/* PET GENDER */}
									<div className="pet-gender input-div">
										<Text
											content={"Chó của bạn là đực hay cái?"}
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
												--Chọn giới tính--
											</option>
											<option value="male">Đực</option>
											<option value="female">Cái</option>
										</select>

										{errors.gender && petData.gender == "" && (
											<Text
												content={errors.gender}
												type={"secondary"}
												className={"text-red-500"}
											/>
										)}
									</div>

									{/* PET NEUTERED */}
									<div className="pet-neutered input-div">
										<Text
											content={"Thú cưng của bạn đã được thiến chưa?"}
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
												--Chọn tình trạng thiến--
											</option>
											<option value={true}>Rồi</option>
											<option value={false}>Chưa</option>
										</select>

										{errors.isNeutered && petData.isNeutered == null && (
											<Text
												content={errors.isNeutered}
												type={"secondary"}
												className={"text-red-500"}
											/>
										)}
									</div>
								</div>

								{/* BTN CONTAINER */}
								<div className="action-btn-container">
									<Button
										content="Save"
										variant="filled"
										className={"btn"}
										onClick={() => handleValidateAddPet(petData)}
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
