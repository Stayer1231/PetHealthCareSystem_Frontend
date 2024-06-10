import React, { useState } from "react";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function PetProfile() {
	const [petProfileShow, setPetProfileShow] = useState(false);

	// ===PET PROFILE MODAL===
	// OPEN
	const openPetProfileModal = () => {
		setPetProfileShow(true);
	};

	// CLOSE
	const closePetProfileModal = () => {
		setPetProfileShow(false);
	};

	return (
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
						onClick={openPetProfileModal}
					/>
				</div>
			</div>

			{/* PET CARD INFORMATION */}
			<div className="pet-information-container">
				<div className="pet-overview-card-container">
					<div className="information-container">
						<Text
							content={"Courage"}
							type={"h3"}
							className={"pet-name"}
						/>
						<div className="sub-information">
							<Text
								content={"Golden Retriever"}
								type={"subtitle"}
								className={"pet-breed"}
							/>
							<span className="divine-symbol">-</span>
							<Text
								content={"15 years old"}
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
										onClick={openPetProfileModal}
									/>
								</div>
								<div className="accordion-information-filled">
									<Text
										content={"Name: "}
										type={"subtitle"}
									/>
									<Text
										content={"Courage"}
										type={"subtitle"}
									/>
								</div>
								<div className="accordion-information">
									<Text
										content={"Breed: "}
										type={"subtitle"}
									/>
									<Text
										content={"Golden Retriever"}
										type={"subtitle"}
									/>
								</div>
								<div className="accordion-information-filled">
									<Text
										content={"Age: "}
										type={"subtitle"}
									/>
									<Text
										content={"15 years old"}
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
				onHide={closePetProfileModal}
				show={petProfileShow}
				size={"sm"}
			>
				<ModalHeader />
				<ModalBody>
					<div className="modal-title">
						<Text content={"Update Pet Profile"} type={"h3"} />
					</div>
					<div className="pet-update-information-container">
						{/* ABOUT PET */}
						<div className="about-pet input-div">
							<Text
								content={`About "Pet Name":`}
								className={"field-label"}
							/>
							<textarea
								name=""
								id=""
								className="general-input-field"
							></textarea>
						</div>

						{/* PET NAME */}
						<div className="pet-name input-div">
							<Text
								content={`What is your pet's name?`}
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
								content={`What is your pet's date of birth?`}
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
								content={`What is the gender of your pet?`}
								className={"field-label required-field"}
							/>
							<input
								type="text"
								className="general-input-field"
							/>
						</div>

						{/* PET NEUTERED */}
						<div className="pet-neutered input-div">
							<Text
								content={`Has your pet been spayed/neutered?`}
								className={"field-label required-field"}
							/>
							<input
								type="text"
								className="general-input-field"
							/>
						</div>

						{/* BTN CONTAINER */}
						<div className="action-btn-container">
							<div className="save-btn-container">
								<Button
									content="Save"
									variant="filled"
									className={"btn"}
									onClick={closePetProfileModal}
								/>
							</div>
							<div className="cancel-btn-container">
								<Button
									content="Cancel"
									variant="transparent"
									className={"btn"}
									onClick={closePetProfileModal}
								/>
							</div>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default PetProfile;

// ?sortBy=&sortOrder&findPropety&findValue&limit&skip
