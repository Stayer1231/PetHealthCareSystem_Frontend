import React, { useEffect, useState } from "react";
import "./HospitalizePetList.scss";
import HospitalizeCard from "../../../molecules/VetRole/HospitalizePetCard/HospitalizeCard";
import APIInUse from "./../../../../config/axios/AxiosInUse";
import Cookies from "js-cookie";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

function HospitalizePetList() {
	const [isLoading, setIsLoading] = useState(true);
	const id = Cookies.get("userId");
	const [hospitalizedPetList, setHospitalizedPetList] = useState([]);

	// GET HOSTPITALIZED PET LIST
	useEffect(() => {
		const getHospitalizedPetList = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(
					`Appointment/vet/appointments/${id}?pageNumber=1&pageSize=1000000`
				);

				const petList = response?.data?.data?.items.flatMap((appointment) =>
					appointment.pets?.map((pet) => pet)
				);

				setHospitalizedPetList(petList);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getHospitalizedPetList();
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

			<div className="hospitalize-pet-list-container">
				<div className="pet-list-container">
					{hospitalizedPetList.length > 0 ? (
						hospitalizedPetList?.map((pet) => (
							<HospitalizeCard data={pet} />
						))
					) : (
						<h1>Hổng có</h1>
					)}
				</div>
			</div>
		</>
	);
}

export default HospitalizePetList;
