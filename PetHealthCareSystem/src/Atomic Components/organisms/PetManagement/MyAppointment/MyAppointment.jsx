import React, { useEffect, useState } from "react";
import "./MyAppointment.scss";
import APIInUse from "../../../../config/axios/AxiosInUse";
import Text from "../../../atoms/Text/Text";
import LoadingComponent from "../../../molecules/LoadingComponent/LoadingComponent";

function MyAppointment() {
	const [isLoading, setIsLoading] = useState(false);
	const [appointments, setAppointments] = useState([]);

	// USE EFFECT
	useEffect(() => {
		const getAppointments = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(
					"Appointment/customer/appointments?pageNumber=1&pageSize=1000000"
				);

				setAppointments(response?.data?.data?.items);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getAppointments();
	}, []);

	return (
		<>
			<LoadingComponent isLoading={isLoading} />

			<div className="my-appointment-container">
				<div className="appointment-list-container">
					<Text
						content={"Danh Sách Lịch Hẹn"}
						type={"h3"}
					/>
				</div>

				{/* APPOINTMENT LIST */}
				<div className="appointment-list-container">
					{appointments?.map((appointment, index) => (
						<div key={index} className="appointment-item">
							
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default MyAppointment;
