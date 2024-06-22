import React from "react";
import "./PatientDetailForm.scss";
import Text from "../../../atoms/Text/Text";
import LogoImg from "../../../../assets/img/dog_logo.jpg";
import DogImg from "../../../../assets/img/Dog.jpg";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";

function PatientDetailForm() {
	function createData(date, description, diagnosis, action, status) {
		return { date, description, diagnosis, action, status };
	}

	function createData2(date, name) {
		return { date, name };
	}

	const rows = [
		createData("21/09/2003", "Chết", "Chết luôn", "Chôn", "Hoàn thành"),
		createData("21/09/2003", "Chết", "Chết luôn", "Chôn", "Hoàn thành"),
		createData("21/09/2003", "Chết", "Chết luôn", "Chôn", "Hoàn thành"),
		createData("21/09/2003", "Chết", "Chết luôn", "Chôn", "Hoàn thành"),
		createData("21/09/2003", "Chết", "Chết luôn", "Chôn", "Hoàn thành"),
	];

	const rows2 = [
		createData2("21/09/2003", "Chói"),
		createData2("15/02/2020", "Rabies"),
		createData2("10/04/2021", "Distemper"),
		createData2("22/06/2021", "Parvovirus"),
		createData2("18/09/2021", "Hepatitis"),
		createData2("30/11/2021", "Leptospirosis"),
	];

	return (
		<>
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
										content={"Veterianian in charge: Nguyen Thanh Phong"}
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
							<HeaderDiv title={"Pet Information"} />

							{/* PET INFORMATION BODY */}
							<div className="information-body">
								{/* IMG CONTAINER */}
								<div className="img-container">
									<img
										src={DogImg}
										alt="Pet Image"
									/>
								</div>

								{/* INFOR CONTAINER */}
								<div className="info-container">
									{/* NAME */}
									<div className="pet-name information-div">
										<Text
											content={"Name: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"Kakashi"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* SPECIES */}
									<div className="pet-breed information-div">
										<Text
											content={"Species: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={" Dog"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* BREED */}
									<div className="pet-breed information-div">
										<Text
											content={"Breed: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"Ninja"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* DATE OF BIRTH */}
									<div className="pet-dob information-div">
										<Text
											content={"Date of Birth: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"21/09/2003"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* OWNER INFORMATION BLOCK */}
						<div className="owner-info-container information-block">
							<HeaderDiv title={"Owner's Information"} />
							<div className="information-body">
								{/* INFO CONTAINER */}
								<div className="info-container">
									{/* OWNER NAME */}
									<div className="owner-name information-div">
										<Text
											content={"Name: "}
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
											content={"Phone: "}
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
						<div className="meidcal-history-container information-block">
							<HeaderDiv title={"Medical History"} />
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
											<TableCell align="right">Hành động</TableCell>
											<TableCell align="right">Trạng thái</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map((row) => (
											<TableRow
												key={row.date}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell
													component="th"
													scope="row"
												>
													{row.date}
												</TableCell>
												<TableCell align="right">{row.name}</TableCell>
												<TableCell align="right">{row.description}</TableCell>
												<TableCell align="right">{row.diagnosis}</TableCell>
												<TableCell align="right">{row.status}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</div>

						{/* IMMUNIZATION HISTORY */}
						<div className="immunization-history-container information-block">
							<HeaderDiv title={"Immunization History"} />
							<TableContainer component={Paper}>
								<Table
									sx={{ minWidth: 650 }}
									aria-label="simple table"
								>
									<TableHead>
										<TableRow>
											<TableCell>Ngày</TableCell>
											<TableCell align="right">Bệnh cần tiêm</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows2.map((row) => (
											<TableRow
												key={row.date}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell
													component="th"
													scope="row"
												>
													{row.date}
												</TableCell>
												<TableCell align="right">{row.name}</TableCell>
											</TableRow>
										))}
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
