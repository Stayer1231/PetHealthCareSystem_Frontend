import React from "react";
import Text from "../../../atoms/Text/Text";
import "./PatientMedicalReport.scss";
import AppointmentCard from "../AppointmentCard/AppointmentCard";

function PatientMedicalReport() {
	return (
		<div className="patient-medical-report-container">
			<div className="medical-table-title">
				<Text
					content={"Quản lý hồ sơ bệnh án thú cưng"}
					type={"subtitle"}
					className={"title-content"}
				/>
			</div>

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
