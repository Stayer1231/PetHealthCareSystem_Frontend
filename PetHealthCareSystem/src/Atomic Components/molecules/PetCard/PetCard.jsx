import React, { useState } from "react";
import "./PetCard.scss";
import CatImg from "../../../assets/img/Cat.jpg";
import DogImg from "../../../assets/img/Dog.jpg";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { DeleteIcon, RightArrowBracket } from "../../../assets/Icon/Icon";
import { useNavigate } from "react-router-dom";
import APIInUse from "../../../config/axios/AxiosInUse";
import { formatDate } from "./../../../config/convertDate";

function PetCard({ data, deletable }) {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	// HANDLE VIEW PET PROFILE
	const handleViewPetProfile = (petId) => {
		navigate(`/your-pet/pet-profile/${petId}`);
	};

	// HANDLE DELETE PET
	const handleDeletePet = async (petId) => {
		setIsLoading(true);
		try {
			await APIInUse.delete(`Pet/customer/remove/${petId}`);
			window.location.reload();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

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

			<div className="pet-card-container">
				{/* Pet image */}
				<div className="pet-image-container">
					{
						data?.species?.toLowerCase() === "cat" ? (
							<img
								src={CatImg}
								alt={"Pet Logo"}
								className="pet-image"
							/>
						) : (
							<img
								src={DogImg}
								alt={"Pet Logo"}
								className="pet-image"
							/>
						)
					}
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
								content={`${formatDate(data.dateOfBirth)}`}
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
