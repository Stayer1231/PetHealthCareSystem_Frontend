import React from "react";
import "./HospitalizeCard.scss";
import { useNavigate } from "react-router-dom";
import CatLogo from "../../../../assets/img/Cat-NonBG.png";
import Text from "../../../atoms/Text/Text";

function HospitalizeCard({ data }) {
	const navigate = useNavigate();
	const handleHospitalizeCardClick = () => {
		navigate(`hospitalize-info/1`);
	};

	return (
		<>
			<div className="hospitalize-card-container">
				<div className="hospitalize-card-sub">
					<Text
						content={"Oggy"}
						type={"h6"}
						className={"pet-general-info"}
					/>
					<span> - </span>
					<Text
						content={"Bạc Giê"}
						type={"h6"}
						className={"pet-general-info"}
					/>
				</div>
				<div
					className="hospitalize-card-main"
					onClick={handleHospitalizeCardClick}
				>
					<div className="pet-img-container">
						<img
							src={CatLogo}
							alt="Pet Image"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default HospitalizeCard;
