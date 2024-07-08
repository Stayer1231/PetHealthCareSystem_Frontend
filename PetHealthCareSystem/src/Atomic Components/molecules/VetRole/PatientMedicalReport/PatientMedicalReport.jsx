import React, { useEffect, useState } from "react";
import Text from "../../../atoms/Text/Text";
import "./PatientMedicalReport.scss";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import CustomTooltip from "../../Tooltip/Tooltip";
import Cookies from "js-cookie";
import APIInUse from "../../../../config/axios/AxiosInUse";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

function PatientMedicalReport() {
	const id = Cookies.get("userId");
	const { patientId } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [workingSchedule, setWorkingSchedule] = useState([]);
	const [petList, setPetList] = useState([]);

	// GET WORKING SCHEDULE
	useEffect(() => {
		const getWorkScheduleData = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(
					`Appointment/vet/appointments/${id}?pageNumber=1&pageSize=1000000`
				);
				
				setWorkingSchedule(response?.data?.data?.items);
			} catch (error) {
				console.log("Error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		getWorkScheduleData();
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

			<div className="patient-medical-report-container">
				<CustomTooltip
					title="Bấm vào các cuộc hẹn để viết hồ sơ bệnh cho thú cưng"
					placement="left"
					arrow
				>
					<div className="medical-table-title">
						<Text
							content={"Quản lý hồ sơ bệnh án thú cưng"}
							type={"subtitle"}
							className={"title-content"}
						/>
					</div>
				</CustomTooltip>

				<div className="appointment-list-container">
					<div className="appointment-list">
						{workingSchedule.length > 0 ? (
							workingSchedule.map((appointment, _) => (
								<AppointmentCard
									name={appointment.name}
									date={appointment.appointmentDate}
									petList={petList}
								/>
							))
						) : (
							<h1>Không có dữ liệu</h1>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default PatientMedicalReport;
