import React, { useEffect, useState } from "react";
import "./PetCard.scss";
import CatImg from "../../../assets/img/Cat.jpg";
import DogImg from "../../../assets/img/Dog.jpg";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { DeleteIcon, RightArrowBracket } from "../../../assets/Icon/Icon";
import { useNavigate } from "react-router-dom";
import APIInUse from "../../../config/axios/AxiosInUse";
import { convertToPetAge } from "../../../config/convertToPetAge";
import ConfirmBox from "../ConfirmBox/ConfirmBox";
import Toast from "../ToasterNotification/ToasterNotification";

function PetCard({ data, deletable }) {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [deletePetConfirmationShow, setDeletePetConfirmationShow] =
		useState(false);

	// HANDLE VIEW PET PROFILE
	const handleViewPetProfile = (petId) => {
		navigate(`/your-pet/pet-profile/${petId}`);
	};

	// HANDLE DELETE PET
	const handleDeletePet = async (petId) => {
		setIsLoading(true);
		try {
			await APIInUse.delete(`Pet/customer/remove/${petId}`);
			sessionStorage.setItem("successMessage", "Xoá thú cưng thành công");
			window.location.reload();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// DELETE PET CONFIRMATION MODAL MANAGEMENT
	const handleOpenDeletePetConfirmation = () => {
		setDeletePetConfirmationShow(true);
	};

	const handleCloseDeletePetConfirmation = () => {
		setDeletePetConfirmationShow(false);
	};

	// TOAST SUCCESS MESSAGE WHEN PET IS DELETED
	useEffect(() => {
		if (sessionStorage.getItem("successMessage")) {
			Toast({
				type: "Success",
				title: "Thành công",
				message: sessionStorage.getItem("successMessage"),
			});
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

			<div className="pet-card-container">
				{/* Pet image */}
				<div className="pet-image-container">
					{data?.species?.toLowerCase() === "cat" ? (
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
					)}
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
								content={`${convertToPetAge(data?.dateOfBirth)}`}
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
								content="Xoá Thú Cưng"
								rightIcon={<DeleteIcon color={"white"} />}
								variant="filled"
								className={"delete-btn"}
								onClick={handleOpenDeletePetConfirmation}
							/>
							<Button
								content="Xem Thông Tin"
								rightIcon={<RightArrowBracket color={"#ffffff"} />}
								className={"view-profile-btn"}
								onClick={() => handleViewPetProfile(data.id)}
							/>
						</div>
					</div>
				</div>

				<ConfirmBox
					onHide={handleCloseDeletePetConfirmation}
					show={deletePetConfirmationShow}
					content={"Bạn có chắc chắn muốn xoá thú cưng này không?"}
					onCancel={handleCloseDeletePetConfirmation}
					onConfirm={() => handleDeletePet(data.id)}
				>
					<div className="confirmation-content">
						<Text
							content={"Bạn có chắc muốn xoá thú cưng này không?"}
							type={"subtitle"}
						/>
					</div>
				</ConfirmBox>
			</div>
		</>
	);
}

export default PetCard;
