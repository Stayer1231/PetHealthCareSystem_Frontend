import React from "react";
import "./PatientCard.scss";
import CatImg from "../../../../assets/img/Cat.jpg";
import Text from "../../../atoms/Text/Text";
import { RightArrowBracket } from "../../../../assets/Icon/Icon";
import { useNavigate } from "react-router-dom";

function PatientCard({ data }) {
	const navigate = useNavigate();

	const handleViewPatientDetail = () => {
		navigate("/medical-record/patient-detail/1");
	};

	return (
		<div className="patient-card-container">
			{/* FIRST PART */}
			<div className="patient-information-container">
				{/* PET IMG */}
				<div className="pet-img-container">
					<img
						src={CatImg}
						alt="Pet Image"
					/>
				</div>

				{/* PET MAIN INFORMATION */}
				<div className="main-information-container">
					<div className="pet-name">
						<Text
							content={"Oggy"}
							type={"h3"}
							className={"information-headline"}
						/>
					</div>
					<div className="pet-sub-information-container">
						<div className="pet-age">
							<Text
								content={"2 years"}
								type={"subtitle"}
								className={"information-text"}
							/>
						</div>
						<span> - </span>
						<div className="pet-breed">
							<Text
								content={"Oggy"}
								type={"subtitle"}
								className={"information-text"}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* SECOND PART */}
			<div
				className="decoration-bg"
				onClick={handleViewPatientDetail}
			>
				<div className="magic-btn">
					<Text
						content={"Magic Button"}
						type={"h6"}
						className={"magic-text"}
						cursor={"pointer"}
					/>
					<RightArrowBracket color={"#FFFFFF"} />
				</div>
			</div>
		</div>
	);
}

export default PatientCard;
