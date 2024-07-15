import React, { useEffect, useState } from "react";
import "./PatientDetailForm.scss";
import Text from "../../../atoms/Text/Text";
import LogoImg from "../../../../assets/img/dog_logo.jpg";
import DogImg from "../../../../assets/img/Dog.jpg";
import CatImg from "../../../../assets/img/Cat.jpg";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import LoadingComponent from "../../../molecules/LoadingComponent/LoadingComponent";
import APIInUse from "./../../../../config/axios/AxiosInUse";
import { useParams } from "react-router-dom";
import { convertToPetAge } from "../../../../config/convertToPetAge";
import { formatDate } from "../../../../config/convertDate";
import Cookies from "js-cookie";

function PatientDetailForm() {
	const [petInformation, setPetInformation] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { patientId } = useParams();
	const fullName = Cookies.get("fullName");
	const [petMedicalRecordList, setPetMedicalRecordList] = useState([]);

	function createData(date, description, diagnosis, treatment) {
		return { date, description, diagnosis, treatment };
	}

	function createData2(date, name) {
		return { date, name };
	}

	// GET PET DATA
	useEffect(() => {
		const getPetData = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(`Pet/${patientId}`);
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
		const getPetMedicalRecords = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(`MedicalRecord/pet/${patientId}`);
				setPetMedicalRecordList(response.data.data.items);
			} catch (error) {
				console.error("Error: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		getPetMedicalRecords();
	}, []);

	return (
		<>
			{isLoading && <LoadingComponent isLoading={isLoading} />}
			<div className="patient-detail-form-container">
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
										content={`Bác sĩ phụ trách: ${fullName}`}
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

						{/* OWNER INFORMATION BLOCK */}
						<div className="owner-info-container information-block">
							<HeaderDiv title={"Thông Tin Chủ Nhân"} />
							<div className="information-body">
								{/* INFO CONTAINER */}
								<div className="info-container">
									{/* OWNER NAME */}
									<div className="owner-name information-div">
										<Text
											content={"Tên: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={petInformation?.ownerName}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* OWNER PHONE NUMBER */}
									<div className="owner-phone information-div">
										<Text
											content={"Số điện thoại: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={petInformation?.ownerPhone}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* OWNER EMAIL */}
									<div className="owner-email information-div">
										<Text
											content={"Email: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={petInformation?.ownerEmail}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* MEDICAL HISTORY */}
						<div className="meidcal-history-container information-block">
							<HeaderDiv title={"Lịch Sử Chữa Bệnh"} />
							<TableContainer component={Paper}>
								<Table
									sx={{ minWidth: 650 }}
									aria-label="simple table"
								>
									<TableHead>
										<TableRow>
											<TableCell>Ngày</TableCell>
											<TableCell align="right">Mô tả</TableCell>
											<TableCell align="right">Chẩn đoán</TableCell>
											<TableCell align="right">Điều trị</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{petMedicalRecordList.length > 0 ? (
											petMedicalRecordList.map((medical) => (
												<TableRow
													key={medical.appointmentId}
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
													}}
												>
													<TableCell
														component="th"
														scope="row"
													>
														{formatDate(medical.date)}
													</TableCell>
													<TableCell align="right">
														{medical.recordDetails}
													</TableCell>
													<TableCell align="right">
														{medical.diagnosis}
													</TableCell>
													<TableCell align="right">
														{medical.treatment}
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan={4}
													align="center"
												>
													<Text
														content={"Không có dữ liệu"}
														type={"subtitle"}
														className={"text-content text-red-500"}
													/>
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PatientDetailForm;

export const HeaderDiv = ({ title }) => {
	return (
		<>
			<div className="header-div">
				<div className="header-title">
					<Text
						content={title}
						type={"h5"}
						className={"title-content"}
					/>
				</div>
			</div>
			<div className="sub-header-div"></div>
		</>
	);
};
