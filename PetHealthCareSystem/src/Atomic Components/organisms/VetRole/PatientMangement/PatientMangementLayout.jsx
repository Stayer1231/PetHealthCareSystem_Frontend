import React from "react";
import "./PatientMangementLayout.scss";
import CatImg from "../../../../assets/img/Cat.jpg";
import PatientMedicalReport from "../../../molecules/VetRole/PatientMedicalReport/PatientMedicalReport";
import Text from "../../../atoms/Text/Text";
import Button from "../../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

function PatientMangementLayout() {
	const navigate = useNavigate();

	const handleViewMedicalRecord = () => {
		navigate("/medical-record/patient-medical-record/1");
	}

	return (
		<div className="patient-management-container">
			<div className="btn-container text-right">
				<Button content="Xem hồ sơ bệnh" variant="filled" onClick={handleViewMedicalRecord}/>
			</div>
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
