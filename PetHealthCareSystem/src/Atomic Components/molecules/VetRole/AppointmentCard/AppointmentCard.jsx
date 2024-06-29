import React, { useState } from "react";
import "./AppointmentCard.scss";
import Text from "../../../atoms/Text/Text";
import CustomTooltip from "./../../Tooltip/Tooltip";
import { Modal, ModalBody, ModalHeader } from "../../Modal/Modal";
import Button from "../../../atoms/Button/Button";
import { formatDate } from "../../../../config/convertDate";
import PatientCard from "../PatientCard/PatientCard";

function AppointmentCard({ name, date, petList }) {
	const [showMedicalRecord, setShowMedicalRecord] = useState(false);
	const [showPetList, setShowPetList] = useState(false);

	// HANDLE MEDICAL RECORD MODAL
	const handleShowMedicalRecord = () => {
		setShowMedicalRecord(true);
	};

	const handleCloseMedicalRecord = () => {
		setShowMedicalRecord(false);
	};
	// -------------------------------

	// HANDLE PET LIST MODAL
	const handleShowPetList = () => {
		setShowPetList(true);
	};

	const handleClosePetList = () => {
		setShowPetList(false);
	};
	// -------------------------------

	// HANDLE FORM SUBMIT
	const handleFormSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="">
			<div
				className="appointment-card-container"
				onClick={handleShowPetList}
			>
				{/* APPOINTMENT INFO */}
				<div className="appointment-info">
					<Text
						content={"Lịch khám"}
						type={"primary"}
						className={"content"}
						cursor={"pointer"}
					/>
					<Text
						content={formatDate(date)}
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

			{/* MEDICAL RECORD MODAL */}
			<Modal
				onHide={handleCloseMedicalRecord}
				show={showMedicalRecord}
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

			{/* PET LIST MODAL */}
			<Modal
				onHide={handleClosePetList}
				show={showPetList}
				size={"sm"}
			>
				<ModalHeader content={"Danh sách thú cưng trong ngày"} />
				<ModalBody>
					<div className="">
						{petList.length > 0
							? petList.map((pet, index) => <PatientCard data={pet} />)
							: null}
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default AppointmentCard;
