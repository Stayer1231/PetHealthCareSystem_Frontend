import React, { useEffect, useState } from "react";
import "./HospitalizePetList.scss";
import HospitalizeCard from "../../../molecules/VetRole/HospitalizePetCard/HospitalizeCard";
import APIInUse from "./../../../../config/axios/AxiosInUse";
import Cookies from "js-cookie";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Text from "../../../atoms/Text/Text";

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
					`Hospitalization/CheckHospitalizaionByVetId?id=${id}`
				);

				// const petList = response?.data?.data?.items.flatMap((appointment) =>
				// 	appointment.pets?.map((pet) => pet)
				// );

				// // Use a Set to filter out duplicates
				// const uniquePets = Array.from(
				// 	new Set(petList.map((pet) => pet.id))
				// ).map((id) => petList.find((pet) => pet.id === id));

				setHospitalizedPetList(response.data.data.items);
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
				<div
					className={`pet-list-container ${
						hospitalizedPetList.length === 0 ? "no-data" : "data"
					}`}
				>
					{hospitalizedPetList.length > 0 ? (
						hospitalizedPetList?.map((pet) => <HospitalizeCard data={pet} />)
					) : (
						<div className="layout">
							<div className="no-data-div">
								<Text
									content={"Chưa có dữ liệu thú cưng nhập viện"}
									type={"h3"}
									textColor={"red"}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default HospitalizePetList;
