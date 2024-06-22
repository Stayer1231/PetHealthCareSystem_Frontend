import React from "react";
import Text from "../../../atoms/Text/Text";
import "./PatientMedicalReport.scss";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import CustomTooltip from "../../Tooltip/Tooltip";
import Button from "../../../atoms/Button/Button";

function PatientMedicalReport() {
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
