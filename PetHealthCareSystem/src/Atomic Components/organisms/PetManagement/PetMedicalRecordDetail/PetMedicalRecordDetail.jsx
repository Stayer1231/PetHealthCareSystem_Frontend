import React, { useEffect, useState } from "react";
import LogoImg from "../../../../assets/img/dog_logo.jpg";
import DogImg from "../../../../assets/img/Dog.jpg";
import CatImg from "../../../../assets/img/Cat.jpg";
import "./PetMedicalRecordDetail.scss";
import { HeaderDiv } from "../../VetRole/PatientDetailForm/PatientDetailForm";
import { useLocation, useParams } from "react-router-dom";
import { convertToPetAge } from "../../../../config/convertToPetAge";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import Text from "../../../atoms/Text/Text";
import LoadingComponent from "../../../molecules/LoadingComponent/LoadingComponent";
import APIInUse from "../../../../config/axios/AxiosInUse";
import { formatDate } from "../../../../config/convertDate";

function PetMedicalRecordDetail() {
	const [petInformation, setPetInformation] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const searchParams = new URLSearchParams(location.search);
	const petId = searchParams.get("petId");
	const appointmentId = searchParams.get("appointmentId");
	const [medicalByPet, setMedicalByPet] = useState(null);

	// GET PET DATA
	useEffect(() => {
		const getPetData = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(`Pet/${petId}`);
				setPetInformation(response.data.data);
			} catch (error) {
				console.error("Error: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		getPetData();
	}, []);

	// GET PET MEDICAL RECORDS
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

	return (
		<>
			{isLoading && <LoadingComponent isLoading={isLoading} />}

			<div className="pet-medical-record-detail-container">
				<div className="form-container">
					{/* FORM HEADER CONTAINER */}
					<div className="form-header-container">
						{/* HEADER MAIN PART */}
						<div className="header-main">
							<div className="header-content">
								{/* LEFT PART */}
								<div className="header-left">
									<Text
										content={"Pet Health Record"}
										type={"h3"}
										className={"title-content"}
									/>
									<Text
										content={"Peticare"}
										type={"subtitle"}
										className={"subtitle-content"}
									/>
									<Text
										content={`Bác sĩ phụ trách: ${medicalByPet?.createdByName}`}
										type={"subtitle"}
										className={"subtitle-content"}
									/>
								</div>

								{/* RIGHT PART */}
								<div className="header-right">
									<div className="img-container">
										<img src={LogoImg} />
									</div>
								</div>
							</div>
						</div>

						{/* HEADER DECORATION PART */}
						<div className="header-sub">
							<div className="color-1" />
							<div className="color-2" />
						</div>
					</div>

					{/* FORM BODY CONTAINER */}
					<div className="form-body-container">
						{/* PET INFORMATION BLOCK */}
						<div className="pet-information information-block">
							<HeaderDiv title={"Thông Tin Thú Cưng"} />

							{/* PET INFORMATION BODY */}
							<div className="information-body">
								{/* IMG CONTAINER */}
								<div className="img-container">
									<img
										src={
											petInformation?.species?.toLowerCase() === "dog"
												? DogImg
												: CatImg
										}
										alt="Pet Image"
									/>
								</div>

								{/* INFOR CONTAINER */}
								<div className="info-container">
									{/* NAME */}
									<div className="pet-name information-div">
										<Text
											content={"Tên: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={petInformation?.name}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* SPECIES */}
									<div className="pet-breed information-div">
										<Text
											content={"Loài: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={
												petInformation?.species.toLowerCase() === "dog"
													? "Chó"
													: "Mèo"
											}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* BREED */}
									<div className="pet-breed information-div">
										<Text
											content={"Giống: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={petInformation?.breed}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* DATE OF BIRTH */}
									<div className="pet-dob information-div">
										<Text
											content={"Tuổi: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={convertToPetAge(petInformation?.dateOfBirth)}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* MEDICAL RECORD BLOCK */}
						<div className="medical-record-container information-block">
							<HeaderDiv title={"Thông Tin Hồ Sơ Bệnh"} />
							<div className="information-body">
								{/* INFO CONTAINER */}
								<div className="info-container">
									{/* RECORD DETAILS */}
									<div className="record-details information-div">
										<Text
											content={"Chi tiết hồ sơ: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={
												medicalByPet?.recordDetails
													? medicalByPet?.recordDetails
													: "Chưa có dữ liệu"
											}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* DIAGNOSIS */}
									<div className="diagnosis information-div">
										<Text
											content={"Chẩn đoán: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={
												medicalByPet?.diagnosis
													? medicalByPet?.diagnosis
													: "Chưa có dữ liệu"
											}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* TREATMENT */}
									<div className="treatment information-div">
										<Text
											content={"Điều trị: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={
												medicalByPet?.treatment
													? medicalByPet?.treatment
													: "Chưa có dữ liệu"
											}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* NOTE */}
									<div className="note information-div">
										<Text
											content={"Ghi chú: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={
												medicalByPet?.note
													? medicalByPet?.note
													: "Chưa có dữ liệu"
											}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* PET WEIGHT */}
									<div className="pet-weight information-div">
										<Text
											content={"Cân nặng (kg): "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={`${
												medicalByPet?.petWeight
													? medicalByPet?.petWeight + "kg"
													: "Chưa có dữ liệu"
											}`}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* REAPPOINTMENT DATE */}
									<div className="reappointment-date information-div">
										<Text
											content={"Ngày tái khám: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={
												medicalByPet?.nextAppointment
													? formatDate(medicalByPet?.nextAppointment)
													: "Chưa có dữ liệu"
											}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* ADMISSION DATE */}
									<div className="admission-date information-div">
										<Text
											content={"Ngày nhập viện: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={
												medicalByPet?.admissionDate
													? formatDate(medicalByPet?.admissionDate)
													: "Chưa có dữ liệu"
											}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* MEDICAL ITEMS */}
									<div className="medical-items-container">
										<Text
											content={"Thuốc chỉ định: "}
											className={"text-label"}
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
												{medicalByPet ? (
													medicalByPet?.medicalItems.map((item, index) => (
														<tr key={index}>
															<td className="orderal-number-content">
																{index + 1}
															</td>
															<td className="text-center">{item.name}</td>
															<td className="quantity-content">
																x{item.quantity ? item.quantity : 0}
															</td>
														</tr>
													))
												) : (
													<tr>
														<td
															colSpan={3}
															className="text-center text-red-500"
														>
															Chưa có dữ liệu
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PetMedicalRecordDetail;
