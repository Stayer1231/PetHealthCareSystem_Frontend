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

function PetProfile() {
	const [isLoading, setIsLoading] = useState(false);
	const { petId } = useParams();
	const [petUpdateProfileShow, setPetUpdateProfileShow] = useState(false);
	const [pet, setPet] = useState(null);
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

	// HANDLE UPDATE PET
	const handleUpdatePet = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await APIInUse.put(`Pet/UpdatePet`, petUpdateData);
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
				const response = await APIInUse.get(`Pet/GetPetForCustomer/${petId}`);
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
							content="Update Profile"
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
									content={pet?.breed}
									type={"subtitle"}
									className={"pet-breed"}
								/>
								<span className="divine-symbol">-</span>
								<Text
									content={pet?.dateOfBirth}
									type={"subtitle"}
									className={"pet-age"}
								/>
							</div>
						</div>
						<div className="medical-record-btn">
							<Button
								content="View Medical History"
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
								content={`Welcome to Pet's profile`}
								type={"h3"}
							/>
						</div>
					</div>
				</div>

				{/* PET DETAILED INFORMATION */}
				<div className="pet-detail-container">
					<div className="pet-detail-accordion">
						<Accordion>
							<AccordionItem title={"Pet Information"}>
								<div className="accordion-information-container">
									<div className="update-information-btn">
										<Button
											content="Update Information"
											variant="no-layout"
											rightIcon={<UpdatePencil color={"#2d759f"} />}
											onClick={openPetUpdateProfileModal}
										/>
									</div>
									<div className="accordion-information-filled">
										<Text
											content={"Name: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.name}
											type={"subtitle"}
										/>
									</div>
									<div className="accordion-information">
										<Text
											content={"Breed: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.breed}
											type={"subtitle"}
										/>
									</div>
									<div className="accordion-information-filled">
										<Text
											content={"Age: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.dateOfBirth}
											type={"subtitle"}
										/>
									</div>
									<div className="accordion-information-filled">
										<Text
											content={"Gender: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.gender}
											type={"subtitle"}
										/>
									</div>
									<div className="accordion-information-filled">
										<Text
											content={"Neuter Status: "}
											type={"subtitle"}
										/>
										<Text
											content={pet?.isNeutered ? "Yes" : "No"}
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
									content={"Update Pet Profile"}
									type={"h3"}
								/>
							</div>
							<div className="pet-update-information-container">
								{/* PET NAME */}
								<div className="pet-name input-div">
									<Text
										content={`What is your pet's name?`}
										className={"field-label required-field"}
									/>
									<input
										type="text"
										className="general-input-field"
										value={petUpdateData?.name}
										onChange={(e) =>
											setPetUpdateData((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
									/>
								</div>

								{/* PET SPECIES */}
								<div className="pet-name input-div">
									<Text
										content={`Assign my pet as?`}
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
											Select role of your pet
										</option>
										<option value="dog">Dog</option>
										<option value="cat">Cat</option>
									</select>
								</div>

								{/* PET BREED */}
								<div className="pet-dob input-div">
									<Text
										content={`What breed is your pet?`}
										className={"field-label required-field"}
									/>
									<input
										type="text"
										className="general-input-field"
										value={petUpdateData?.breed}
										placeholder="Enter your pet's breed"
										onChange={(e) =>
											setPetUpdateData((prev) => ({
												...prev,
												breed: e.target.value,
											}))
										}
									/>
								</div>

								{/* PET DOB */}
								<div className="pet-gender input-div">
									<Text
										content={`What is your pet's date of birth?`}
										className={"field-label required-field"}
									/>
									<input
										type="date"
										className="general-input-field"
										value={formatDate(petUpdateData?.dateOfBirth)}
										onChange={(e) =>
											setPetUpdateData((prev) => ({
												...prev,
												dateOfBirth: e.target.value,
											}))
										}
									/>
								</div>

								{/* PET GENDER */}
								<div className="pet-neutered input-div">
									<Text
										content={`What is your pet's gender?`}
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
											Is your pet neutered
										</option>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
								</div>
							</div>

							{/* BUTTON CONTAINER */}
							<div className="action-btn-container">
								<Button
									content="Save"
									variant="filled"
									className={"btn"}
									onClick={closePetUpdateProfileModal}
									type={"submit"}
								/>
								<Button
									content="Cancel"
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
