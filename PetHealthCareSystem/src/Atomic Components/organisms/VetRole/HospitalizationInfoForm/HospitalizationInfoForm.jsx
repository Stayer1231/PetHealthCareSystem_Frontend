import React from "react";
import "./HospitalizationInfoForm.scss";
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

function HospitalizationInfForm() {
	return (
		<div className="hospitalization-info-form-container">
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
									content={"Bác sĩ phụ trách: Nguyen Thanh Phong"}
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
									src={CatImg}
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
										content={"petInformation?.name"}
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
											// petInformation?.species.toLowerCase() === "dog"
											// 	? "Chó"
											// 	: "Mèo"
											"Chó"
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
										content={"petInformation?.breed"}
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
										content={
											// convertToPetAge(petInformation?.dateOfBirth)
											"20 tuooir"
										}
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
										content={"Kakashi Hatake"}
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
										content={"0938555758"}
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
										content={"nthanhphong941@gmail.com"}
										type={"subtitle"}
										className={"text-content"}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* MEDICAL HISTORY */}
					<div className="hospitalization-info-container information-block">
						<HeaderDiv title={"Thông Tin Nhập Viện"} />
						{/* <TableContainer component={Paper}>
							<Table
								sx={{ minWidth: 650 }}
								aria-label="simple table"
							> */}
						{/* <TableHead>
									<TableRow>
										<TableCell>Ngày</TableCell>
										<TableCell align="right">Mô tả</TableCell>
										<TableCell align="right">Chẩn đoán</TableCell>
										<TableCell align="right">Điều trị</TableCell>
									</TableRow>
								</TableHead> */}
						{/* <TableBody> */}
						{/* {petMedicalRecordList.length > 0 ? (
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
												<TableCell align="right">{medical.diagnosis}</TableCell>
												<TableCell align="right">{medical.treatment}</TableCell>
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
									)} */}
						{/* </TableBody> */}
						{/* </Table>
						</TableContainer> */}
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
										content={"Không có"}
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
										content={"Bị viêm gan B"}
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
										content={"Phẫu thuật"}
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
										content={"Theo dõi tình trạng của thú cưng thường xuyên"}
										type={"subtitle"}
										className={"text-content"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 

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

export default HospitalizationInfForm;
