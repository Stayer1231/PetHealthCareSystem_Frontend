import React, { useEffect, useState } from "react";
import "./PetProfile.scss";
import CatImg from "../../../../assets/img/Cat.jpg";
import DogImg from "../../../../assets/img/Dog.jpg";
import Button from "../../../atoms/Button/Button";
import { UpdatePencil } from "../../../../assets/Icon/Icon";
import Text from "../../../atoms/Text/Text";
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
} from "../../../molecules/Accordion/Accordion";
import { Modal, ModalBody, ModalHeader } from "../../../molecules/Modal/Modal";
import { useLocation, useParams } from "react-router-dom";
import APIInUse from "./../../../../config/axios/AxiosInUse";
import { Backdrop, CircularProgress } from "@mui/material";
import { formatDate } from "../../../../config/convertDate";
import Cookies from "js-cookie";
import { convertToPetAge } from "./../../../../config/convertToPetAge";
import { UpdatePetValidation } from "../../../../validate/Validation";
import Toast from "../../../molecules/ToasterNotification/ToasterNotification";
import { CatBreeds } from "../../../../TestData/AnimalBreed/CatBreeds";
import { DogBreeds } from "../../../../TestData/AnimalBreed/DogBreeds";

function PetProfile() {
	const [isLoading, setIsLoading] = useState(false);
	const id = Cookies.get("userId");
	const { petId } = useParams();
	const [petUpdateProfileShow, setPetUpdateProfileShow] = useState(false);
	const [pet, setPet] = useState(null);
	const [catBreedList, setCatBreedList] = useState([]);
	const [dogBreedList, setDogBreedList] = useState([]);
	const [errors, setErrors] = useState({});
	const [petUpdateData, setPetUpdateData] = useState({
		id: 0,
		name: "",
		species: "",
		breed: "",
		gender: "",
		dateOfBirth: "",
		isNeutered: null,
	});

	// ===PET PROFILE MODAL===
	// OPEN
	const openPetUpdateProfileModal = () => {
		setPetUpdateProfileShow(true);
	};

	// CLOSE
	const closePetUpdateProfileModal = () => {
		setPetUpdateProfileShow(false);
	};

	const handleValidateUpdatePet = (data) => {
		const error = UpdatePetValidation(data);
		setErrors(error);
	};

	// HANDLE UPDATE PET
	const handleUpdatePet = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		try {
			setIsLoading(true);
			await APIInUse.put(`Pet/customer/update`, petUpdateData);
			sessionStorage.setItem("successMessage", "Cập nhật thú cưng thành công");
			window.location.reload();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// USE EFFECT SCOPE
	useEffect(() => {
		const getPet = async () => {
			setIsLoading(true);
			try {
				const response = await APIInUse.get(`Pet/customer/${petId}`);
				setPet(response.data.data);
				setPetUpdateData({
					id: response.data.data.id,
					name: response.data.data.name,
					species: response.data.data.species,
					breed: response.data.data.breed,
					gender: response.data.data.gender,
					dateOfBirth: response.data.data.dateOfBirth,
					isNeutered: response.data.data.isNeutered,
				});
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getPet();
	}, [petId]);

	// GET ANIMAL BREED LIST
	useEffect(() => {
		setCatBreedList(CatBreeds);
		setDogBreedList(DogBreeds);
	}, []);

	// GET SUCCESS MESSAGE FROM SESSION
	useEffect(() => {
		if (sessionStorage.getItem("successMessage")) {
			Toast({
				type: "success",
				title: "Thành công",
				message: sessionStorage.getItem("successMessage"),
			});
			sessionStorage.removeItem("successMessage");
		}
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
			<div className="pet-profile-container">
				{/* WELCOME BACKGROUND */}
				<div className="background-container">
					<img
						src={DogImg}
						alt="Pet Logo"
						className="pet-logo"
					/>
					<div className="update-profile-btn">
						<Button
							content="Cập Nhật Thông Tin"
							rightIcon={<UpdatePencil color={"#ffff"} />}
							variant="transparent"
							stroke={"#ffff"}
							textColor={"white"}
							onClick={openPetUpdateProfileModal}
						/>
					</div>
				</div>

				{/* PET CARD INFORMATION */}
				<div className="pet-information-container">
					<div className="pet-overview-card-container">
						<div className="information-container">
							<Text
								content={pet?.name}
								type={"h3"}
								className={"pet-name"}
							/>
							<div className="sub-information">
								<Text
									content={convertToPetAge(pet?.dateOfBirth)}
									type={"subtitle"}
									className={"pet-age"}
								/>
								<span className="divine-symbol"> - </span>
								<Text
									content={pet?.breed}
									type={"subtitle"}
									className={"pet-breed"}
								/>
							</div>
						</div>
						<div className="medical-record-btn">
							<Button
								content="Hồ Sơ Bệnh"
								variant="filled"
								className={"btn"}
							/>
						</div>
					</div>
				</div>

				{/* WELCOME TO PET PROFILE CARD */}
				<div className="pet-profile-welcome-card-container">
					<div className="welcome-card">
						<div className="pet-logo-container">
							<img
								src={DogImg}
								alt="Dog Logo"
							/>
						</div>
						<div className="welcome-card-content">
							<Text
								content={`Chào mừng đến với hồ sơ của ${pet?.name}`}
								type={"h3"}
							/>
						</div>
					</div>
				</div>

				{/* PET DETAILED ACCORDION */}
				<div className="pet-detail-container">
					<div className="pet-detail-accordion">
						<Accordion>
							<AccordionItem title={"Thông Tin Thú Cưng"}>
								<div className="accordion-information-container">
									<div className="update-information-btn">
										<Button
											content="Cập Nhật Thông Tin"
											variant="no-layout"
											rightIcon={<UpdatePencil color={"#2d759f"} />}
											onClick={openPetUpdateProfileModal}
										/>
									</div>
									<div className="accordion-information-filled">
										<Text
											content={"Tên: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.name}
											type={"subtitle"}
										/>
									</div>
									<div className="accordion-information">
										<Text
											content={"Giống: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.breed}
											type={"subtitle"}
										/>
									</div>
									<div className="accordion-information-filled">
										<Text
											content={"Sinh nhật: "}
											type={"subtitle"}
										/>
										<Text
											content={formatDate(pet?.dateOfBirth)}
											type={"subtitle"}
										/>
									</div>
									<div className="accordion-information-filled">
										<Text
											content={"Giới tính: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.gender}
											type={"subtitle"}
										/>
									</div>
									<div className="accordion-information-filled">
										<Text
											content={"Tình trạng thiến: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.isNeutered ? "Đã thiến" : "Chưa thiến"}
											type={"subtitle"}
										/>
									</div>
								</div>
							</AccordionItem>
						</Accordion>
					</div>
				</div>

				{/* MODAL PUT HERE */}
				{/* PET PROFILE */}
				<Modal
					onHide={closePetUpdateProfileModal}
					show={petUpdateProfileShow}
					size={"sm"}
				>
					<ModalHeader />
					<ModalBody>
						<form onSubmit={handleUpdatePet}>
							<div className="modal-title">
								<Text
									content={"Cập Nhật Thông Tin Thú Cưng!"}
									type={"h3"}
								/>
							</div>
							<div className="pet-update-information-container">
								{/* PET NAME */}
								<div className="pet-name input-div">
									<Text
										content={`Tên thú cưng của bạn là gì?`}
										className={"field-label required-field"}
									/>
									<input
										type="text"
										className="general-input-field"
										value={petUpdateData?.name}
										placeholder="Tên thú cưng..."
										onChange={(e) =>
											setPetUpdateData((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
									/>

									{errors.name && petUpdateData.name == "" && (
										<Text
											content={errors.name}
											type={"secondary"}
											className={"text-red-500"}
										/>
									)}
								</div>

								{/* PET SPECIES */}
								<div className="pet-name input-div">
									<Text
										content={`Thú cưng của tôi là?`}
										className={"field-label required-field"}
									/>
									<select
										className="general-input-field"
										value={petUpdateData?.species}
										onChange={(e) =>
											setPetUpdateData((prev) => ({
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
										value={petUpdateData?.breed}
										onChange={(e) =>
											setPetUpdateData((prev) => ({
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
										{petUpdateData.species.toLowerCase() === "dog"
											? dogBreedList.map((breed) => (
													<option value={breed}>{breed}</option>
											  ))
											: petUpdateData.species.toLowerCase() == "cat"
											? catBreedList.map((breed) => (
													<option value={breed}>{breed}</option>
											  ))
											: null}
									</select>

									{errors.breed && petUpdateData.breed == "" && (
										<Text
											content={errors.breed}
											type={"secondary"}
											className={"text-red-500"}
										/>
									)}
								</div>

								{/* PET DOB */}
								<div className="pet-gender input-div">
									<Text
										content={`Sinh nhật của thú cưng của bạn là ngày nào?`}
										className={"field-label required-field"}
									/>
									<input
										type="date"
										className="general-input-field"
										value={petUpdateData?.dateOfBirth}
										onChange={(e) =>
											setPetUpdateData((prev) => ({
												...prev,
												dateOfBirth: e.target.value,
											}))
										}
									/>

									{errors.dateOfBirth && petUpdateData.dateOfBirth == "" && (
										<Text
											content={errors.dateOfBirth}
											type={"secondary"}
											className={"text-red-500"}
										/>
									)}
								</div>

								{/* PET GENDER */}
								<div className="pet-neutered input-div">
									<Text
										content={`Chó của bạn là đực hay cái?`}
										className={"field-label required-field"}
									/>
									<select
										className="general-input-field"
										value={petUpdateData?.gender}
										onChange={(e) =>
											setPetUpdateData((prev) => ({
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
											petUpdateData?.isNeutered === null
												? ""
												: petUpdateData?.isNeutered
										}
										onChange={(e) =>
											setPetUpdateData((prev) => ({
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
								</div>
							</div>

							{/* BUTTON CONTAINER */}
							<div className="action-btn-container">
								<Button
									content="Lưu"
									variant="filled"
									className={"btn"}
									onClick={() => handleValidateUpdatePet(petUpdateData)}
									type={"submit"}
								/>
								<Button
									content="Huỷ"
									variant="transparent"
									className={"btn"}
									type={"submit"}
								/>
							</div>
						</form>
					</ModalBody>
				</Modal>
			</div>
		</>
	);
}

export default PetProfile;
