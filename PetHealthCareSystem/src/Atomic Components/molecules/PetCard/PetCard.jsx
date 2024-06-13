import React from "react";
import "./PetCard.scss";
import CatImg from "../../../assets/img/Cat.jpg";
import DogImg from "../../../assets/img/Dog.jpg";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { RightArrowBracket } from "../../../assets/Icon/Icon";
import { useNavigate } from "react-router-dom";

function PetCard({ data }) {
	const navigate = useNavigate();

	const HandleViewPetProfile = (petId) => {
		navigate(`/your-pet/pet-profile/${petId}`);
	};

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
						<Button
							content="View Pet Profile"
							rightIcon={<RightArrowBracket color={"#ffffff"} />}
							className={"button-item"}
							onClick={() => HandleViewPetProfile(data.id)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default PetCard;
