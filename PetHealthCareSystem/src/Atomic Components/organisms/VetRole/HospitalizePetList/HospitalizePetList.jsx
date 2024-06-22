import React from "react";
import "./HospitalizePetList.scss";
import PatientCard from "../../../molecules/VetRole/PatientCard/PatientCard";
import HospitalizeCard from "../../../molecules/VetRole/HospitalizePetCard/HospitalizeCard";

function HospitalizePetList() {
	return (
		<div className="hospitalize-pet-list-container">
			<div className="pet-list-container">
				<HospitalizeCard />
			</div>
		</div>
	);
}

export default HospitalizePetList;
