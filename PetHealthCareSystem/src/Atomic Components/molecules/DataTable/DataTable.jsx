import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import Text from "../../atoms/Text/Text";
import CustomTooltip from "../Tooltip/Tooltip";
import { formatDate } from "./../../../config/convertDate";
import "./DataTable.scss";
import Pagination from "../Paginate/Pagination";

const DataTableHeader = ({ headerColumns }) => {
	// Use to display the column name
	const columnMapping = {
		appointmentDate: "Ngày hẹn",
		pet: "Tên",
		dob: "Ngày sinh",
		petId: "Pet ID",
		services: "Dịch vụ",
		medicalRecord: "Hồ sơ khám bệnh",
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
			</TableRow>
		</TableHead>
	);
};

// ---------------------------- DataTable ----------------------------
const DataTable = ({ data, headerColumns }) => {
	const URL_PATH = useLocation();
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage, setRecordsPerPage] = useState(10);
	const navigate = useNavigate();
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const records = data?.slice(firstIndex, lastIndex);
	const npage = Math.ceil(data?.length / recordsPerPage);

	// 	HANDLE NAME CLICK
	const handleNameClick = (id) => {
		navigate(`patient/${id}`);
	};

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

	return (
		<div className="table-container">
			<Box sx={{ width: "100%" }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
						>
							<DataTableHeader headerColumns={headerColumns} />
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
													key={row.pet.id}
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
															onClick={() => handleNameClick(row.pet.id)}
														/>
													</TableCell>

													{/* SERVICES */}
													<TableCell
														align="center"
														padding="normal"
														className={"data-content w-72"}
													>
														<CustomTooltip
															title={servicesString}
															placement={"right"}
															arrow
														>
															<div>
																<Text
																	content={truncateString(servicesString, 100)}
																	type={"subtitle"}
																	className={"data-content"}
																	cursor={"pointer"}
																/>
															</div>
														</CustomTooltip>
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
															content={row.pet.hasMedicalRecord ? "Đã có hồ sơ" : "Chưa có hồ sơ"}
															type={"subtitle"}
															className={"data-content"}
															cursor={"pointer"}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									</>
								) : (
									<TableRow>
										<TableCell
											colSpan={
												headerColumns && Array.isArray(headerColumns)
													? headerColumns.length + 1
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

export { DataTable, DataTableHeader };
