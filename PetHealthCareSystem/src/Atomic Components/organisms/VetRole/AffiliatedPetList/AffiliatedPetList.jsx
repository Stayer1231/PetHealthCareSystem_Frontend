import React from "react";
import "./AffiliatedPetList.scss";
import PetCard from "../../../molecules/PetCard/PetCard";
import { VetPetList } from "../../../../TestData/PetListData/VetPetList";
import PatientCard from "../../../molecules/VetRole/PatientCard/PatientCard";

function AffiliatedPetList() {
	const petData = VetPetList;

	return (
		<div className="affiliated-pet-list-container">
			<div className="pet-list-container">
				<PatientCard />
				<PatientCard />
				<PatientCard />
				<PatientCard />
				<PatientCard />
				<PatientCard />
				<PatientCard />
			</div>
		</div>
	);
}

export default AffiliatedPetList;
