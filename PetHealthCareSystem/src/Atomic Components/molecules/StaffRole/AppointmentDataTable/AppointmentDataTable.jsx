import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIInUse from "../../../../config/axios/AxiosInUse";
import {
    setAppointmentList,
    setPageNo,
    setPageSize,
    setHasPreviousPage,
    setHasNextPage,
    setTotalPage
} from "../../../../config/store/StaffRole/staffRole";
import {
    Box,
    Paper,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Text from "../../../atoms/Text/Text";
import './AppointmentDataTable.scss';

const DataTableHeader = () => {
    const columnMapping = [
        "Ngày hẹn", "Khách hàng", "Thú cưng", "Bác sĩ", "Giờ bắt đầu",
        "Giờ kết thúc", "Dịch vụ", "Trạng thái", "Thao tác"
    ];

    return (
        <TableHead style={{ backgroundColor: "var(--JELLY-BEAN)" }}>
            <TableRow>
                {columnMapping.map((cell, index) => (
                    <TableCell align="center" padding="normal" className="table-head table-head-title" key={index}>
                        <div className="table-head-label">
                            <Text content={cell} type="subtitle" textColor={"white"} />
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const AppointmentDataTable = () => {
    const dispatch = useDispatch();
    const pageNo = useSelector((state) => state.staffRole.pageNo);
    const pageSize = useSelector((state) => state.staffRole.pageSize);
    const appointmentList = useSelector((state) => state.staffRole.appointmentList);
    const hasPreviousPage = useSelector((state) => state.staffRole.hasPreviousPage);
    const hasNextPage = useSelector((state) => state.staffRole.hasNextPage);
    const totalPage = useSelector((state) => state.staffRole.totalPage);
    const showModal = useSelector((state) => state.staffRole.showModal);
    const [appList, setAppList] = React.useState([]);

    const handleLoadAppointmentList = async () => {
        try {
            const response = await APIInUse.get(`Appointment/appointments?pageNumber=${pageNo}&pageSize=${pageSize}`);
            console.log("Fetched Data:", response.data);
            dispatch(setAppointmentList(response.data.data.items));
            setAppList(response.data.data.items);
            console.log("Appointments:", response.data.data.items);
            dispatch(setHasPreviousPage(response.data.data.hasPreviousPage));
            dispatch(setHasNextPage(response.data.data.hasNextPage));
            dispatch(setTotalPage(response.data.data.totalPages));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleLoadAppointmentList();
    }, [pageNo, pageSize, showModal]);

    useEffect(() => {
        console.log("Updated Appointment List:", appointmentList);
    }, [appointmentList]);

    const handleChangePageNo = (value) => dispatch(setPageNo(value));
    const handleChangePageSize = (value) => {
        dispatch(setPageSize(value));
        dispatch(setPageNo(1));
    };

    const formatDate = (date) => new Date(date).toLocaleDateString();

    return (
        <div className="table-container">
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <DataTableHeader />
                            <TableBody>
                                {appList && appList.length > 0 ? (
                                    appList?.map((row, rowIndex) => {
                                        const servicesString = row.services?.map((service) => service.name).join(", ");
                                        const petsString = row.pets?.map((pet) => pet.name).join(", ");

                                        return (
                                            <TableRow hover tabIndex={-1} key={row.id} sx={{ cursor: "pointer" }}>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    {formatDate(row.appointmentDate)}
                                                </TableCell>
                                                {row.customer === null ? <TableCell align="center" padding="normal" className={"data-content"}>Không có</TableCell>
                                                    :
                                                    <TableCell align="center" padding="normal" className={"data-content"}>
                                                        <Text content={row.customer.fullName} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                    </TableCell>
                                                }

                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={petsString} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={row.vet.fullName} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={row.timeTable.startTime} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={row.timeTable.endTime} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={servicesString} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={row.status} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"} />
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center" className="not-found-message">
                                            <Text content={"Chưa có thông tin"} type={"h6"} textColor={"red"} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Box className="pagination-container">
                    <div className={`to-first-page ${pageNo === 1 ? 'disabled' : ''}`} onClick={() => handleChangePageNo(1)}>
                        <Text className="to-first-page-text" content={"<<"} />
                    </div>
                    <div className={`to-previous-page ${pageNo === 1 ? 'disabled' : ''}`} onClick={() => handleChangePageNo(pageNo - 1)}>
                        <Text className="to-previous-page-text" content={"<"} />
                    </div>
                    <div className="page-number">
                        <Text className="page-number-text" content={pageNo} />
                    </div>
                    <div className={`to-next-page ${pageNo === totalPage ? 'disabled' : ''}`} onClick={() => handleChangePageNo(pageNo + 1)}>
                        <Text className="to-next-page-text" content={">"} />
                    </div>
                    <div className={`to-last-page ${pageNo === totalPage ? 'disabled' : ''}`} onClick={() => handleChangePageNo(totalPage)}>
                        <Text className="to-last-page-text" content={">>"} />
                    </div>
                </Box>
                <Box className="page-size">
                    <Text content={"Số dòng mỗi trang"} type={"subtitle"} />
                    <Select value={pageSize} onChange={(e) => handleChangePageSize(e.target.value)}>
                        {[10, 20, 50, 100].map((size) => (
                            <MenuItem value={size} key={size}>{size}</MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
        </div>
    );
};

export { AppointmentDataTable, DataTableHeader };
