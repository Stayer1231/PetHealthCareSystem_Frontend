import React, { useEffect, useState } from "react";
import "./PatientMangementLayout.scss";
import CatImg from "../../../../assets/img/Cat.jpg";
import DogImg from "../../../../assets/img/Dog-NonBG.png";
import Text from "../../../atoms/Text/Text";
import Button from "../../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import APIInUse from "../../../../config/axios/AxiosInUse";
import LoadingComponent from "../../../molecules/LoadingComponent/LoadingComponent";
import { convertToPetAge } from "./../../../../config/convertToPetAge";
import { formatDate } from "../../../../config/convertDate";
import { CreateMedicalRecordValidation } from "../../../../validate/Validation";
import Toast from "../../../molecules/ToasterNotification/ToasterNotification";
import { addDays, format, parseISO } from "date-fns";

function PatientMangementLayout() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	const petId = searchParams.get("petId");
	const [medicalItems, setMedicalItems] = useState([]);
	const appointmentId = searchParams.get("appointmentId");
	const [isNextAppointment, setIsNextAppointment] = useState(false);
	const [isAdmissionDate, setIsAdmissionDate] = useState(false);
	const [errors, setErrors] = useState({});
	const [isCreatingMedicalRecord, setIsCreatingMedicalRecord] = useState(false);
	const [medicalByPet, setMedicalByPet] = useState(null);
	const [patientInformation, setPatientInformation] = useState(null);
	const [appointmentInformation, setAppointmentInformation] = useState(null);
	const [medicalRecordData, setMedicalRecordData] = useState({
		appointmentId: 0,
		petId: 0,
		recordDetails: "",
		diagnosis: "",
		treatment: "",
		note: "",
		nextAppointment: "",
		petWeight: 0,
		medicalItems: [],
		admissionDate: null,
		dischargeDate: null,
	});

	//	CALCULATE THE MIN DATE OF ADMISSION DATE
	const calculateMinDate = (appointmentDate) => {
		if (!appointmentDate) return ""; // Return empty string if appointmentDate is falsy

		const parsedDate = parseISO(appointmentDate); // Parsing ISO string to Date object
		const minDate = format(addDays(parsedDate, 1), "yyyy-MM-dd");

		return minDate;
	};

	// HANDLE VIEW MEDICAL RECORD
	const handleViewMedicalRecord = (petId) => {
		navigate(`/medical-record/patient-medical-record/${petId}`);
	};

	// HANDLE CLICK CREATE MEDICAL RECORD BUTTON
	const handleCreatingMedicalBtnClick = () => {
		setIsCreatingMedicalRecord(true);
	};

	// HANDLE ADD MORE MEDICAL ITEM FIELDS
	const handleAddMedicalItem = (e) => {
		e.preventDefault();
		setMedicalRecordData((prevData) => ({
			...prevData,
			medicalItems: [
				...prevData.medicalItems,
				{ medicalItemId: 0, quantity: 0 }, // Initialize with default values
			],
		}));
	};

	// HANDLE VALIDATE CREATE MEDICAL RECORD
	const handleValidateCreateMedicalRecord = (data) => {
		const error = CreateMedicalRecordValidation(
			data,
			isNextAppointment,
			isAdmissionDate
		);
		setErrors(error);
	};

	// HANDLE SUBMIT CREATE MEDICAL RECORD
	const handleSubmitCreateMedicalRecord = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		try {
			setIsLoading(true);
			// Create medical record
			await APIInUse.post("MedicalRecord/create", medicalRecordData);

			// CREATE TEMP DATA OF MEDICAL RECORD
			let medicalRecordTemp = await APIInUse.get(
				`Appointment/${appointmentId}`
			);
			let tempData = medicalRecordTemp.data.data;

			// Update appointment status if all pets have medical records
			if (tempData?.pets.every((pet) => pet.hasMedicalRecord)) {
				await APIInUse.put(`Appointment/done/${appointmentId}`);
			}

			// Display success message
			sessionStorage.setItem("successMessage", "Tạo mới hồ sơ bệnh thành công");
			window.location.reload();
		} catch (error) {
			// Display error message
			Toast({
				message:
					error.response?.data?.Message || "Có lỗi xảy ra khi tạo hồ sơ bệnh",
				type: "error",
				title: "Lỗi",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// CHECK IF MEDICAL ITEMS ARE VALID
	const isValidMedicalItems = () => {
		const isValid = medicalRecordData.medicalItems.some(
			(item) => item.medicalItemId !== 0 && item.quantity > 0
		);
		return isValid;
	};

	// CHANGE CHECKVALIDMEDICALITEMS TO TRUE WHEN MEDICAL ITEMS CHANGE
	useEffect(() => {
		isValidMedicalItems();
	}, [medicalRecordData.medicalItems]);

	// CHECK IF URL IS VALID
	useEffect(() => {
		if (!petId || !appointmentId) {
			navigate("/");
		}
	}, []);

	// GET ALL MEDICAL ITEMS
	useEffect(() => {
		const fetchMedicalItems = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get("MedicalItem/all");
				setMedicalItems(response.data.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMedicalItems();
	}, []);

	// UPDATE MEDICAL RECORD DATA WHEN PET AND APPOINTMENT INFORMATION IS AVAILABLE
	useEffect(() => {
		setMedicalRecordData((prevData) => ({
			...prevData,
			appointmentId: appointmentInformation?.id,
			petId: patientInformation?.id,
		}));
	}, [patientInformation, appointmentInformation]);

	// GET REQUIRED DATA
	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const patientResponse = await APIInUse.get(`Pet/${petId}`);
				setPatientInformation(patientResponse.data.data);

				const appointmentResponse = await APIInUse.get(
					`Appointment/${appointmentId}`
				);
				setAppointmentInformation(appointmentResponse.data.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// GET MEDICAL BY PET
	useEffect(() => {
		const fetchGetMedicalOfPet = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(
					`MedicalRecord/pet/${petId}/appointment/${appointmentId}?pageNumber=1&pageSize=100000`
				);
				setMedicalByPet(response.data.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGetMedicalOfPet();
	}, []);

	// GET SUCCESS MESSAGE
	useEffect(() => {
		const successMessage = sessionStorage.getItem("successMessage");
		if (successMessage) {
			Toast({
				message: successMessage,
				type: "success",
				title: "Thành công",
			});
			sessionStorage.removeItem("successMessage");
		}
	}, []);

	useEffect(() => {
		if (isAdmissionDate) {
			setMedicalRecordData((prevData) => ({
				...prevData,
				admissionDate: calculateMinDate(
					appointmentInformation?.appointmentDate
				),
			}));
		} else {
			setMedicalRecordData((prevData) => ({
				...prevData,
				admissionDate: null,
			}));
		}
	}, [isAdmissionDate]);

	return (
		<>
			{isLoading && <LoadingComponent isLoading={isLoading} />}

			<div
				className={`patient-management-container ${
					isCreatingMedicalRecord ? "form-active" : "form-inactive"
				}`}
			>
				<div className="btn-container text-right mb-5">
					<Button
						content="Hồ sơ thú cưng"
						variant="filled"
						onClick={() => handleViewMedicalRecord(patientInformation.id)}
					/>
				</div>

				{/* CHECK IF PET ALREADY HAS MEDICAL RECORD */}
				{medicalByPet ? (
					<div className="pet-medical-record-container">
						{/* INFO HEADER */}
						<div className="info-header">
							<div className="pet-overview-container">
								<div className="img-container">
									<img
										src={
											patientInformation?.species.toLowerCase() === "cat"
												? CatImg
												: DogImg
										}
										alt="Pet Image"
									/>
								</div>

								<div className="pet-information-container">
									<div className="information-div">
										<Text
											content={"Tên: "}
											type={"h5"}
											className={"text-label"}
										/>
										<Text
											content={patientInformation?.name}
											type={"h6"}
											className={"text-content"}
										/>
									</div>

									<div className="information-div">
										<Text
											content={"Tuổi: "}
											type={"h5"}
											className={"text-label"}
										/>
										<Text
											content={convertToPetAge(patientInformation?.dateOfBirth)}
											type={"h6"}
											className={"text-content"}
										/>
									</div>

									<div className="information-div">
										<Text
											content={"Giống: "}
											type={"h5"}
											className={"text-label"}
										/>
										<Text
											content={patientInformation?.breed}
											type={"h6"}
											className={"text-content"}
										/>
									</div>
								</div>
							</div>

							<div className="header-sub">
								<div className="color-1" />
								<div className="color-2" />
							</div>
						</div>

						{/* INFO BODY */}
						<div className="info-body">
							<div className="info-title">
								<Text
									content={`Hồ sơ bệnh ngày ${formatDate(
										appointmentInformation?.appointmentDate
									)}`}
									type={"h3"}
								/>
							</div>

							{/* MAIN INFO CONTAINER */}
							<div className="info-layout">
								{/* RECORD DETAILS */}
								<div className="info-div">
									<Text
										content={"Chi tiết hồ sơ: "}
										className={"info-label"}
									/>
									<Text
										content={medicalByPet?.recordDetails}
										className={"info-content"}
									/>
								</div>

								{/* DIAGNOSIS */}
								<div className="info-div">
									<Text
										content={"Chẩn đoán: "}
										className={"info-label"}
									/>
									<Text
										content={medicalByPet?.diagnosis}
										className={"info-content"}
									/>
								</div>

								{/* TREATMENT */}
								<div className="info-div">
									<Text
										content={"Điều trị: "}
										className={"info-label"}
									/>
									<Text
										content={medicalByPet?.treatment}
										className={"info-content"}
									/>
								</div>

								{/* NOTE */}
								<div className="info-div">
									<Text
										content={"Ghi chú: "}
										className={"info-label"}
									/>
									<Text
										content={medicalByPet?.note}
										className={"info-content"}
									/>
								</div>

								{/* NEXT APPOINTMENT */}
								<div className="info-div">
									<Text
										content={"Ngày tái khám: "}
										className={"info-label"}
									/>
									<Text
										content={
											medicalByPet?.nextAppointment
												? formatDate(medicalByPet?.nextAppointment)
												: "Không có"
										}
										className={"info-content"}
									/>
								</div>

								{/* PET WEIGHT */}
								<div className="info-div">
									<Text
										content={"Cân nặng thú cưng (kg): "}
										className={"info-label"}
									/>
									<Text
										content={`${medicalByPet?.petWeight}kg`}
										className={"info-content"}
									/>
								</div>

								{/* MEDICAL ITEMS */}
								<div className="medical-items-container">
									<Text
										content={"Thuốc chỉ định: "}
										className={"info-label"}
									/>
									<table
										className="medical-items-table"
										border={1}
									>
										<thead>
											<tr>
												<th>STT</th>
												<th>Tên thuốc</th>
												<th>Số lượng</th>
											</tr>
										</thead>
										<tbody>
											{medicalByPet?.medicalItems.map((item, index) => (
												<tr key={index}>
													<td className="orderal-number-content">
														{index + 1}
													</td>
													<td className="text-center">{item.name}</td>
													<td className="quantity-content">
														x{item.quantity ? item.quantity : 0}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								{/* ADMISSION DATE */}
								<div className="info-div">
									<Text
										content={"Ngày nhập viện: "}
										className={"info-label"}
									/>
									<Text
										content={`${
											medicalByPet?.admissionDate
												? formatDate(medicalByPet?.admissionDate)
												: "Không có"
										}`}
										className={"info-content"}
									/>
								</div>
							</div>
						</div>
					</div>
				) : isCreatingMedicalRecord ? null : (
					// IF PET DOES NOT HAVE MEDICAL RECORD AND NOT CREATING MEDICAL RECORD
					<>
						<div className="medical-record-not">
							<Text
								content={"Thú cưng chưa có hồ sơ bệnh cho cuộc hẹn này"}
								textColor={"red"}
							/>
							<Button
								content="Viết hồ sơ bệnh"
								onClick={handleCreatingMedicalBtnClick}
							/>
						</div>
					</>
				)}

				{/* CREATING MEDICAL RECORD FORM */}
				<form
					className={`patient-management-form-container ${
						isCreatingMedicalRecord ? "active-form" : "inactive-form"
					}`}
					onSubmit={handleSubmitCreateMedicalRecord}
				>
					<div className="form-title">
						<Text
							content={"Tạo Hồ Sơ Bệnh"}
							type={"h3"}
							className={"form-title-text"}
						/>
					</div>

					<div className="form-content-container">
						{/* PET NAME */}
						<div className="input-div">
							<Text
								content={"Thú cưng: "}
								className={"input-label"}
							/>
							<Text
								content={patientInformation?.name}
								className="input-pre-val"
							/>
						</div>

						{/* APPOINTMENT DATE */}
						<div className="input-div">
							<Text
								content={"Ngày cuộc hẹn: "}
								className={"input-label"}
							/>
							<Text
								content={formatDate(appointmentInformation?.appointmentDate)}
								className="input-pre-val"
							/>
						</div>

						{/* RECORD DETAILS */}
						<div className="input-div">
							<div className="label-container">
								<Text
									content={"Chi tiết hồ sơ: "}
									className={"input-label"}
								/>
								{errors.recordDetails &&
									medicalRecordData.recordDetails == "" && (
										<Text
											content={errors.recordDetails}
											type={"secondary"}
											className={"text-red-500"}
										/>
									)}
							</div>
							<textarea
								value={medicalRecordData.recordDetails}
								className="general-textarea-field"
								placeholder="Chi tiết hồ sơ..."
								onChange={(e) =>
									setMedicalRecordData((prevData) => ({
										...prevData,
										recordDetails: e.target.value,
									}))
								}
							/>
						</div>

						{/* DIAGNOSIS */}
						<div className="input-div">
							<div className="label-container">
								<Text
									content={"Chẩn đoán: "}
									className={"input-label"}
								/>
								{errors.diagnosis && medicalRecordData.diagnosis == "" && (
									<Text
										content={errors.diagnosis}
										type={"secondary"}
										className={"text-red-500"}
									/>
								)}
							</div>

							<textarea
								value={medicalRecordData.diagnosis}
								className="general-textarea-field"
								placeholder="Chẩn đoán..."
								onChange={(e) =>
									setMedicalRecordData((prevData) => ({
										...prevData,
										diagnosis: e.target.value,
									}))
								}
							/>
						</div>

						{/* TREATMENT */}
						<div className="input-div">
							<div className="label-container">
								<Text
									content={"Điều trị: "}
									className={"input-label"}
								/>
								{errors.treatment && medicalRecordData.treatment == "" && (
									<Text
										content={errors.treatment}
										type={"secondary"}
										className={"text-red-500"}
									/>
								)}
							</div>
							<textarea
								value={medicalRecordData.treatment}
								className="general-textarea-field"
								placeholder="Điều trị..."
								onChange={(e) =>
									setMedicalRecordData((prevData) => ({
										...prevData,
										treatment: e.target.value,
									}))
								}
							/>
						</div>

						{/* NOTES */}
						<div className="input-div">
							<div className="label-container">
								<Text
									content={"Ghi chú: "}
									className={"input-label"}
								/>
								{errors.note && medicalRecordData.note == "" && (
									<Text
										content={errors.note}
										type={"secondary"}
										className={"text-red-500"}
									/>
								)}
							</div>

							<textarea
								value={medicalRecordData.note}
								className="general-textarea-field"
								placeholder="Ghi chú..."
								onChange={(e) =>
									setMedicalRecordData((prevData) => ({
										...prevData,
										note: e.target.value,
									}))
								}
							/>
						</div>

						{/* NEXT APPOINTMENT */}
						<div className="checkbox-div">
							<input
								type="checkbox"
								className="general-checkbox"
								onChange={(e) => setIsNextAppointment(e.target.checked)}
							/>
							<Text
								content={"Hẹn lịch tái khám"}
								className={"input-label"}
							/>
						</div>

						{isNextAppointment && (
							<div className="input-div">
								<div className="label-container">
									<Text
										content={"Ngày hẹn tiếp theo: "}
										className={"input-label"}
									/>
									{errors.nextAppointment &&
										medicalRecordData.nextAppointment == "" && (
											<Text
												content={errors.nextAppointment}
												type={"secondary"}
												className={"text-red-500"}
											/>
										)}
								</div>
								<input
									value={medicalRecordData.nextAppointment}
									type="date"
									className="general-input-field"
									placeholder="Ngày hẹn tiếp theo..."
									onChange={(e) =>
										setMedicalRecordData((prevData) => ({
											...prevData,
											nextAppointment: e.target.value,
										}))
									}
								/>
							</div>
						)}

						{/* PET WEIGHT */}
						<div className="input-div">
							<div className="label-container">
								<Text
									content={"Cân nặng của thú (kg): "}
									className={"input-label"}
								/>
								{errors.petWeight && medicalRecordData.petWeight == 0 && (
									<Text
										content={errors.petWeight}
										type={"secondary"}
										className={"text-red-500"}
									/>
								)}
							</div>

							<input
								value={medicalRecordData.petWeight}
								type="number"
								min={0}
								max={20}
								className="general-input-field"
								placeholder="Cân nặng của thú..."
								onChange={(e) =>
									setMedicalRecordData((prevData) => ({
										...prevData,
										petWeight: parseInt(e.target.value) || 0,
									}))
								}
							/>
						</div>

						{/* MEDICAL ITEMS */}
						<div className="medical-item-select">
							<div className="label-container">
								<Text
									content={"Thuốc chỉ định"}
									className={"input-label"}
								/>
								{errors.medicalItems &&
									(medicalRecordData.medicalItems.length === 0 ||
										!isValidMedicalItems()) && (
										<Text
											content={errors.medicalItems}
											type={"secondary"}
											className={"text-red-500"}
										/>
									)}
							</div>

							<div className="select-div">
								{medicalRecordData.medicalItems.map((item, index) => (
									<>
										<select
											name=""
											id=""
											className="general-input-field select-input"
											onChange={(e) =>
												setMedicalRecordData((prevData) => ({
													...prevData,
													medicalItems: prevData.medicalItems.map(
														(medItem, idx) =>
															idx === index
																? { ...medItem, medicalItemId: e.target.value }
																: medItem
													),
												}))
											}
										>
											<option value="0">--Chọn mục y tế--</option>
											{medicalItems.length > 0
												? medicalItems.map((medicalItem) => (
														<option value={medicalItem.id}>
															{medicalItem.name}
														</option>
												  ))
												: null}
										</select>
										<input
											value={item.quantity}
											type="number"
											min={0}
											max={100}
											className="general-input-field"
											placeholder="Số lượng"
											onChange={(e) =>
												setMedicalRecordData((prevData) => ({
													...prevData,
													medicalItems: prevData.medicalItems.map(
														(medItem, idx) =>
															idx === index
																? {
																		...medItem,
																		quantity: parseInt(e.target.value) || 0,
																  }
																: medItem
													),
												}))
											}
										/>
									</>
								))}
							</div>

							<Button
								content="Thêm thuốc y tế"
								onClick={handleAddMedicalItem}
								className={"add-medical-item-btn"}
							/>
						</div>

						{/* ADMISSION DATE */}
						<div className="checkbox-div">
							<input
								type="checkbox"
								className="general-checkbox"
								onChange={(e) => setIsAdmissionDate(e.target.checked)}
							/>
							<Text
								content={"Đề nghị nhập viện"}
								className={"input-label"}
							/>
						</div>

						{isAdmissionDate && (
							<>
								<div className="input-div">
									<div className="label-container">
										<Text
											content={"Ngày nhập viện: "}
											className={"input-label"}
										/>
										{errors.admissionDate &&
											medicalRecordData.admissionDate === null && (
												<Text
													content={errors.admissionDate}
													type={"secondary"}
													className={"text-red-500"}
												/>
											)}
									</div>
									<input
										value={medicalRecordData.admissionDate}
										type="date"
										className="general-input-field"
										placeholder="Ngày nhập viện..."
										min={calculateMinDate(
											appointmentInformation?.appointmentDate
										)}
										onChange={(e) =>
											setMedicalRecordData((prevData) => ({
												...prevData,
												admissionDate: e.target.value,
											}))
										}
									/>
								</div>
							</>
						)}

						<Button
							content="Tạo Hồ Sơ Bệnh"
							type={"submit"}
							onClick={() =>
								handleValidateCreateMedicalRecord(medicalRecordData)
							}
						/>
					</div>
				</form>
			</div>
		</>
	);
}

export default PatientMangementLayout;
