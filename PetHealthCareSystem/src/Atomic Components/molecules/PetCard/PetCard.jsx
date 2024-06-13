import React, { useState } from "react";
import "./PetCard.scss";
import CatImg from "../../../assets/img/Cat.jpg";
import DogImg from "../../../assets/img/Dog.jpg";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { DeleteIcon, RightArrowBracket } from "../../../assets/Icon/Icon";
import { useNavigate } from "react-router-dom";
import APIInUse from "../../../config/axios/AxiosInUse";

function PetCard({ data, deletable }) {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	// HANDLE VIEW PET PROFILE
	const handleViewPetProfile = (petId) => {
		navigate(`/your-pet/pet-profile/${petId}`);
	};

	// HANDLE DELETE PET
	const handleDeletePet = async (petId) => {
		try {
			setIsLoading(true);
			await APIInUse.delete(`Pet/RemovePet/${petId}`)
			window.location.reload();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<div className="pet-card-container">
				{/* Pet image */}
				<div className="pet-image-container">
					<img
						src={DogImg}
						alt={"Cat Logo"}
						className="pet-image"
					/>
				</div>

				{/* Pet details */}
				<div className="pet-information-container">
					<div className="pet-details-container">
						<div className="pet-name">
							<Text
								content={`${data.name}`}
								type={"h4"}
								className={"pet-name-content"}
							/>
						</div>
						<div className="pet-sub-information">
							<Text
								content={`${data.dateOfBirth}`}
								type={"subtitle"}
								className={"pet-age-content information-content"}
							/>
							<span> - </span>
							<Text
								content={`${data.breed}`}
								type={"subtitle"}
								className={"pet-breed-content information-content"}
							/>
						</div>
					</div>

					{/* Go to pet profile button */}
					<div className="profile-go-btn">
						<div className="button-layout">
							<Button
								content="Delete Pet"
								rightIcon={<DeleteIcon color={"white"} />}
								variant="filled"
								className={"delete-btn"}
								onClick={() => handleDeletePet(data.id)}
							/>
							<Button
								content="View Pet Profile"
								rightIcon={<RightArrowBracket color={"#ffffff"} />}
								className={"view-profile-btn"}
								onClick={() => handleViewPetProfile(data.id)}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PetCard;
