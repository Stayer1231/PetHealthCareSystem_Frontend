import React, { useState } from "react";
import "./AppointmentCard.scss";
import Text from "../../../atoms/Text/Text";
import CustomTooltip from "./../../Tooltip/Tooltip";
import { Modal, ModalBody, ModalHeader } from "../../Modal/Modal";
import Button from "../../../atoms/Button/Button";

function AppointmentCard({ name, date }) {
	const [showModal, setShowModal] = useState(false);

	// HANLDE APPOINTMENT CARD CLICK
	const handleShowModal = () => {
		setShowModal(true);
	};

	// HANDLE MODAL CLOSE
	const handleCloseModal = () => {
		setShowModal(false);
	};

	// HANDLE FORM SUBMIT
	const handleFormSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="">
			<div
				className="appointment-card-container"
				onClick={handleShowModal}
			>
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

			<Modal
				onHide={handleCloseModal}
				show={showModal}
				size={"sm"}
			>
				<ModalHeader content={"Hồ Sơ Bệnh Của Thú Cưng"} />
				<ModalBody>
					<form
						className="pet-medical-record-container"
						onSubmit={handleFormSubmit}
					>
						<div className="medical-date information-div">
							<Text
								content={"Ngày khám: "}
								type={"subtitle"}
								className={"input-label"}
							/>
							<input type="date" />
						</div>

						<div className="medical-desc information-div">
							<Text
								content={"Mô tả: "}
								type={"subtitle"}
								className={"input-label"}
							/>
							<input
								type="text"
								placeholder="Mô tả ..."
							/>
						</div>

						<div className="medical-diagnosis information-div">
							<Text
								content={"Chẩn đoán: "}
								type={"subtitle"}
								className={"input-label"}
							/>
							<input
								type="text"
								placeholder="Chẩn đoán ..."
							/>
						</div>

						<div className="medical-action information-div">
							<Text
								content={"Hành động: "}
								type={"subtitle"}
								className={"input-label"}
							/>
							<input
								type="text"
								placeholder="Hành động ..."
							/>
						</div>

						<div className="action-btn-container">
							<Button
								content="Save"
								type={"submit"}
								variant="filled"
								className={"save-btn"}
							/>
							<Button
								content="Cancel"
								type={"button"}
								variant="transparent"
								className={"cancel-btn"}
							/>
						</div>
					</form>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default AppointmentCard;
