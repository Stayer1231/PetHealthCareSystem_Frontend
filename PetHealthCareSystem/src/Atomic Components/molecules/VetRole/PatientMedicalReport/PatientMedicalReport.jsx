import React, { useEffect, useState } from "react";
import Text from "../../../atoms/Text/Text";
import "./PatientMedicalReport.scss";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import CustomTooltip from "../../Tooltip/Tooltip";
import Button from "../../../atoms/Button/Button";

function PatientMedicalReport() {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const getWorkScheduleData = async () => {
			try {
				const response = await APIInUse.get(
					`Appointment/vet/appointments/${id}?pageNumber=1&pageSize=1000000`
				);

				const formattedData = response.data.data.items.map((appointment) => ({
					id: appointment.id,
					title: `Dịch vụ: ${appointment.services
						.map((service) => service.name)
						.join(", ")}`,
					start: new Date(
						`${appointment.appointmentDate}T${appointment.timeTable.startTime}`
					),
					end: new Date(
						`${appointment.appointmentDate}T${appointment.timeTable.endTime}`
					),
				}));

				setEvents(formattedData);
			} catch (error) {
				console.log("Error:", error);
			}
		};

		getWorkScheduleData();
	}, []);

	return (
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
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
					<AppointmentCard />
				</div>
			</div>
		</div>
	);
}

export default PatientMedicalReport;
