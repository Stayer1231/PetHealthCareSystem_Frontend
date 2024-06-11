import React, { useState } from "react";
import "./PetOverview.scss";
import Text from "../../../atoms/Text/Text";
import PetCard from "../../../molecules/PetCard/PetCard";
import Button from "../../../atoms/Button/Button";
import { AddIcon } from "../../../../assets/Icon/Icon";
import { Modal, ModalBody, ModalHeader } from "../../../molecules/Modal/Modal";

function PetOverview() {
	const [showAddPetModal, setShowAddPetModal] = useState(false);

	// === PET MODAL ===
	const openAddPetModal = () => {
		setShowAddPetModal(true);
	};

	const closeAddPetModal = () => {
		setShowAddPetModal(false);
	};

	return (
		<div className="pet-overview-container">
			<div className="greeting-container">
				<Text
					content={`Welcome Back, ${"Username"}`}
					type={"h3"}
					className={"greeting-content"}
				/>
			</div>
			<div className="pet-list-container">
				<PetCard data={""} />
				<PetCard data={""} />
			</div>
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

export default PetOverview;
