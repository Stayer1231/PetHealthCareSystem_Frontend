import React, { useEffect, useState } from "react";
import "./AffiliatedPetList.scss";
import PatientCard from "../../../molecules/VetRole/PatientCard/PatientCard";
import { Backdrop, CircularProgress } from "@mui/material";
import APIInUse from "../../../../config/axios/AxiosInUse";
import Cookies from "js-cookie";

function AffiliatedPetList() {
	const [isLoading, setIsLoading] = useState(true);
	const [petList, setPetList] = useState([]);
	const id = Cookies.get("userId");

	// USE EFFECT SCOPE
	useEffect(() => {
		const getAppointmentList = async () => {
			setIsLoading(true);

			try {
				const response = await APIInUse.get(
					`Appointment/vet/appointments/${id}?pageNumber=1&pageSize=1000000`
				);

				const petList = response?.data?.data?.items.flatMap((appointment) =>
					appointment.pets?.map((pet) => pet)
				);

				console.log(petList);

				setPetList(petList);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getAppointmentList();
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

			<div className="affiliated-pet-list-container">
				<div className="pet-list-container">
					{petList.length > 0 ? (
						petList?.flatMap((pet) => (
							<>
								<PatientCard data={pet} />
							</>
						))
					) : (
						<h1>Không có dữ liệu</h1>
					)}
				</div>
			</div>
		</>
	);
}

export default AffiliatedPetList;
