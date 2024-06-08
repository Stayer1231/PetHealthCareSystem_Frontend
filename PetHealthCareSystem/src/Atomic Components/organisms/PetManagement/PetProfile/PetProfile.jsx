import React from "react";
import "./PetProfile.scss";
import CatImg from "../../../../assets/img/Cat.jpg";
import DogImg from "../../../../assets/img/Dog.jpg";
import Button from "../../../atoms/Button/Button";
import { UpdatePencil } from "../../../../assets/Icon/Icon";

function PetProfile() {
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
					/>
				</div>
			</div>

			{/* PET INFORMATION */}
			<div className="pet-information-container">
				<div className="welcome-card-container"></div>
			</div>
		</div>
	);
}

export default PetProfile;
