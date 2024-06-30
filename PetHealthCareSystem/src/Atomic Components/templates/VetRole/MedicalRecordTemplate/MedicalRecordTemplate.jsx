import React, { useEffect, useState } from "react";
import { DataTable } from "./../../../molecules/DataTable/DataTable";
import APIInUse from "./../../../../config/axios/AxiosInUse";
import Cookies from "js-cookie";

function MedicalRecordTemplate() {
	const id = Cookies.get("userId");
	const [isLoading, setIsLoading] = useState(true);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		const getMedicalRecordsData = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(
					`Appointment/vet/appointments/${id}?pageNumber=1&pageSize=1000000`
				);
				const appointments = response.data.data.items.flatMap((item) =>
					item.pets.map((pet) => ({
						appointmentDate: item.appointmentDate,
						pet: {
							name: pet.name,
							id: pet.id,
							dateOfBirth: pet.dateOfBirth,
						},
						services: item.services.map((service) => ({
							id: service.id,
							name: service.name,
							description: service.description,
							price: service.price,
						})),
					}))
				);

				console.log(appointments);
				setTableData(appointments);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getMedicalRecordsData();
	}, []);

	return (
		<div className="medical-record-template-container">
			<DataTable
				headerColumns={["pet", "services", "dob", "appointmentDate"]}
				bodyColumn={["pet", "owner", "services", "appointmentDate"]}
				data={tableData}
			/>
		</div>
	);
}

export default MedicalRecordTemplate;
