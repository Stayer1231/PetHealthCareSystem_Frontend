import React from "react";
import "./AppointmentCard.scss";
import Text from "../../../atoms/Text/Text";
import CustomTooltip from "./../../Tooltip/Tooltip";

function AppointmentCard({ name, date, onClick }) {
	return (
		<CustomTooltip
			title="Click to view appointment details"
			placement="top"
			arrow
		>
			<div className="appointment-card-container">
				{/* APPOINTMENT INFO */}
				<div className="appointment-info">
					<Text
						content={"Name here"}
						type={"primary"}
						className={"content"}
						cursor={"pointer"}
					/>
					<Text
						content={"Date here"}
						type={"primary"}
						className={"content"}
						cursor={"pointer"}
					/>
				</div>

				{/* PULSE */}
				<div className="pulse-container">
					<div className="pulse">
						<span style={{ "--i": 0 }}></span>
						<span style={{ "--i": 1 }}></span>
					</div>
				</div>
			</div>
		</CustomTooltip>
	);
}

export default AppointmentCard;
