import React, { useEffect, useState } from "react";
import "./MyAppointment.scss";
import APIInUse from "../../../../config/axios/AxiosInUse";
import Text from "../../../atoms/Text/Text";
import LoadingComponent from "../../../molecules/LoadingComponent/LoadingComponent";
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../molecules/Paginate/Pagination";
import { formatDate } from "../../../../config/convertDate";
import Button from "../../../atoms/Button/Button";
import CustomTooltip from "../../../molecules/Tooltip/Tooltip";

function MyAppointment() {
	const [isLoading, setIsLoading] = useState(false);
	const [appointments, setAppointments] = useState([]);

	// USE EFFECT
	useEffect(() => {
		const getAppointments = async () => {
			try {
				setIsLoading(true);
				const response = await APIInUse.get(
					"Appointment/customer/appointments?pageNumber=1&pageSize=1000000"
				);

				const appointments = response.data.data.items.flatMap((item) =>
					item.pets.map((pet) => ({
						appointmentDate: item.appointmentDate,
						appointmentId: item.id,
						status: item.status,
						id: item.id,
						pet: {
							name: pet.name,
							id: pet.id,
							dateOfBirth: pet.dateOfBirth,
							hasMedicalRecord: pet.hasMedicalRecord,
						},
						services: item.services.map((service) => ({
							id: service.id,
							name: service.name,
							description: service.description,
							price: service.price,
						})),
					}))
				);

				setAppointments(appointments);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getAppointments();
	}, []);

	return (
		<>
			<LoadingComponent isLoading={isLoading} />

			<div className="my-appointment-container">
				<div className="appointment-list-container">
					<Text
						content={"Danh Sách Lịch Hẹn"}
						type={"h3"}
						className={"appointment-list-title"}
					/>
				</div>

				<DataTable
					data={appointments}
					allowedAction={true}
				/>
			</div>
		</>
	);
}

const DataTableHeader = ({ headerColumns, allowedAction }) => {
	// Use to display the column name
	const columnMapping = {
		appointmentDate: "Ngày hẹn",
		pet: "Tên thú cưng",
		dob: "Ngày sinh",
		services: "Dịch vụ",
		status: "Trạng thái",
	};

	return (
		<TableHead style={{ backgroundColor: "var(--JELLY-BEAN)" }}>
			<TableRow>
				<TableCell
					align="center"
					padding="normal"
					className="table-head table-head-title"
				>
					<div className="table-head-label">
						<Text
							content="#"
							type="subtitle"
							textColor={"white"}
							className={"table-head-label"}
						/>
					</div>
				</TableCell>
				{headerColumns &&
					Array.isArray(headerColumns) &&
					headerColumns.map((item, index) => (
						<TableCell
							key={index}
							align="center"
							padding="normal"
							className="table-head table-head-title"
						>
							<div className="table-head-label">
								<Text
									content={columnMapping[item] || item}
									type="subtitle"
									textColor={"white"}
									className={"table-head-label"}
								/>
							</div>
						</TableCell>
					))}

				{allowedAction && (
					<TableCell
						align="center"
						padding="normal"
						className="table-head table-head-title"
					>
						<div className="table-head-label">
							<Text
								content={"Hành động"}
								type="subtitle"
								textColor={"white"}
								className={"table-head-label"}
							/>
						</div>
					</TableCell>
				)}
			</TableRow>
		</TableHead>
	);
};

// ---------------------------- DataTable ----------------------------
const DataTable = ({ data, headerColumns, allowedAction }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage, setRecordsPerPage] = useState(10);
	const navigate = useNavigate();
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const records = data?.slice(firstIndex, lastIndex);
	const npage = Math.ceil(data?.length / recordsPerPage);

	// HANDLE CHANGE PAGE
	const handleChangePage = (event, value) => {
		setCurrentPage(value);
	};

	// HANDLE CHANGE PAGE SIZE
	const handleChangePageSize = (value, pageIndex) => {
		setRecordsPerPage(value);
		setCurrentPage(1);
	};

	// TRUNCATE STRING
	const truncateString = (str, num) => {
		if (str.length <= num) {
			return str;
		}
		return str.slice(0, num) + "...";
	};

	// HANDLE VIEW RECORD
	const handleViewRecord = (petId, aptId) => {
		navigate(`pet-medical-detail?petId=${petId}&appointmentId=${aptId}`);
	};

	return (
		<div className="table-container">
			<Box sx={{ width: "100%" }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
						>
							<DataTableHeader
								headerColumns={[
									"pet",
									"dob",
									"services",
									"appointmentDate",
									"status",
								]}
								allowedAction={allowedAction}
							/>
							<TableBody>
								{records?.length !== 0 ? (
									<>
										{records?.map((row, rowIndex) => {
											const labelId = `enhanced-table-checkbox-${rowIndex}`;

											// Concatenate service names and prices into a single string
											const servicesString = row.services
												.map((service) => `${service.name}`)
												.join(", ");

											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={rowIndex}
													sx={{ cursor: "pointer" }}
												>
													{/* ROW NUMBER */}
													<TableCell
														align="center"
														padding="normal"
														className={"data-content"}
													>
														<Text
															content={firstIndex + rowIndex + 1}
															type={"subtitle"}
															className={"data-content"}
															cursor={"pointer"}
														/>
													</TableCell>

													{/* PET NAME */}
													<TableCell
														align="center"
														padding="normal"
														className={"data-content"}
													>
														<Text
															content={row.pet.name}
															type={"subtitle"}
															className={"data-content pet-name"}
															cursor={"pointer"}
														/>
													</TableCell>

													{/* PET DOB */}
													<TableCell
														align="center"
														padding="normal"
														className={"data-content"}
													>
														<Text
															content={formatDate(row.pet.dateOfBirth)}
															type={"subtitle"}
															className={"data-content"}
															cursor={"pointer"}
														/>
													</TableCell>

													{/* SERVICES */}
													<TableCell
														align="center"
														padding="normal"
														className={"data-content w-72"}
													>
														{servicesString.length > 100 ? (
															<CustomTooltip
																title={servicesString}
																placement={"right"}
																arrow
															>
																<div>
																	<Text
																		content={truncateString(
																			servicesString,
																			100
																		)}
																		type={"subtitle"}
																		className={"data-content"}
																		cursor={"pointer"}
																	/>
																</div>
															</CustomTooltip>
														) : (
															<div>
																<Text
																	content={truncateString(servicesString, 100)}
																	type={"subtitle"}
																	className={"data-content"}
																	cursor={"pointer"}
																/>
															</div>
														)}
													</TableCell>

													{/* APPOINTMENT DATE */}
													<TableCell
														align="center"
														padding="normal"
														className={"data-content"}
														id={labelId}
													>
														<Text
															content={formatDate(row.appointmentDate)}
															type={"subtitle"}
															className={"data-content"}
															cursor={"pointer"}
														/>
													</TableCell>

													{/* HAS MEDICAL RECORD */}
													<TableCell
														align="center"
														padding="normal"
														className={"data-content"}
														id={labelId}
													>
														<Text
															content={
																row.status.toLowerCase() === "completed"
																	? "Hoàn thành"
																	: "Chưa hoàn thành"
															}
															type={"subtitle"}
															className={`data-content ${
																row.status.toLowerCase() === "completed"
																	? "text-green"
																	: "text-red"
															}`}
															cursor={"pointer"}
														/>
													</TableCell>

													{/* IF ALLOWED ACTION */}
													{allowedAction && (
														<TableCell
															align="center"
															padding="normal"
															className={"data-content"}
														>
															{row.status.toLowerCase() === "completed" ? (
																<Button
																	content={"Xem hồ sơ"}
																	variant="filled"
																	className={"action-btn"}
																	onClick={() =>
																		handleViewRecord(row.pet.id, row.id)
																	}
																/>
															) : (
																<CustomTooltip
																	title={"Thú cưng này chưa có hồ sơ bệnh"}
																	placement={"right"}
																	arrow={true}
																>
																	<div>
																		<Button
																			content={"Xem hồ sơ"}
																			variant="filled"
																			className={"action-btn-disabled"}
																			disabled
																		/>
																	</div>
																</CustomTooltip>
															)}
														</TableCell>
													)}
												</TableRow>
											);
										})}
									</>
								) : (
									<TableRow>
										<TableCell
											colSpan={
												headerColumns && Array.isArray(headerColumns)
													? headerColumns.length + 2
													: 0
											}
											align="center"
											className="not-found-message"
										>
											<Text
												content={"Chưa có thông tin"}
												type={"h6"}
												textColor={"red"}
											/>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
				<Pagination
					count={npage}
					handlePagination={handleChangePage}
					pageIndex={currentPage}
					pageSize={recordsPerPage}
					handleChangePageSize={handleChangePageSize}
				/>
			</Box>
		</div>
	);
};

export default MyAppointment;
