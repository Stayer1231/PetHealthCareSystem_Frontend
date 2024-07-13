import React, { useEffect, useState } from "react";
import { DataTable } from "./../../../molecules/DataTable/DataTable";
import APIInUse from "./../../../../config/axios/AxiosInUse";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";

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
						appointmentId: item.id,
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

			<div className="medical-record-template-container">
				<DataTable
					headerColumns={[
						"pet",
						"dob",
						"services",
						"appointmentDate",
						"medicalRecord",
					]}
					data={tableData}
					allowedAction={true}
				/>
			</div>
		</>
	);
}

export default MedicalRecordTemplate;
