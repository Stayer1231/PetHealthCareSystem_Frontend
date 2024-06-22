import React from "react";
import "./PatientMangementLayout.scss";
import CatImg from "../../../../assets/img/Cat.jpg";
import PatientMedicalReport from "../../../molecules/VetRole/PatientMedicalReport/PatientMedicalReport";
import Text from "../../../atoms/Text/Text";

function PatientMangementLayout() {
	return (
		<div className="patient-management-container">
			<div className="pet-overview-container">
				<div className="img-container">
					<img
						src={CatImg}
						alt="Pet Image"
					/>
				</div>
				<div className="pet-information-container">
					{/* PET NAME */}
					<div className="information-div">
						<Text
							content={"Tên: "}
							type={"h4"}
							className={"text-label"}
						/>
						<Text
							content={"Kakashi"}
							type={"h6"}
							className={"text-content"}
						/>
					</div>

					{/* PET SPECIES */}
					<div className="information-div">
						<Text
							content={"Loài: "}
							type={"h4"}
							className={"text-label"}
						/>
						<Text
							content={"Mèo"}
							type={"h6"}
							className={"text-content"}
						/>
					</div>

					{/* PET BREED */}
					<div className="information-div">
						<Text
							content={"Giống: "}
							type={"h4"}
							className={"text-label"}
						/>
						<Text
							content={"Sphynx"}
							type={"h6"}
							className={"text-content"}
						/>
					</div>
				</div>
			</div>

			<PatientMedicalReport />
		</div>
	);
}

export default PatientMangementLayout;
