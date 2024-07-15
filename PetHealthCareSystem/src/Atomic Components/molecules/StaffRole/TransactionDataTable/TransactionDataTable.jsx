import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIInUse from "../../../../config/axios/AxiosInUse";
import {
    setAppointmentList,
    setPageNo,
    setPageSize,
    setHasPreviousPage,
    setHasNextPage,
    setTotalPage,
    setTransactionList
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
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import Text from "../../../atoms/Text/Text";
import './TransactionDataTable.scss';

const DataTableHeader = () => {
    const columnMapping = [
        "Tên khách hàng", "Tổng chi phí", "Ngày trả", "Trạng thái", "Thao tác"
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

const TransactionDataTable = () => {
    const dispatch = useDispatch();
    const pageNo = useSelector((state) => state.staffRole.pageNo);
    const pageSize = useSelector((state) => state.staffRole.pageSize);
    const transactionList = useSelector((state) => state.staffRole.transactionList);
    const hasPreviousPage = useSelector((state) => state.staffRole.hasPreviousPage);
    const hasNextPage = useSelector((state) => state.staffRole.hasNextPage);
    const totalPage = useSelector((state) => state.staffRole.totalPage);
    const showModal = useSelector((state) => state.staffRole.showModal);
    const [appList, setAppList] = React.useState([]);

    const handleLoadAppointmentList = async () => {
        try {
            const response = await APIInUse.get(`Transaction/get-all?pageNumber=${pageNo}&pageSize=${pageSize}`);
            console.log("Fetched Data:", response.data);
            dispatch(setTransactionList(response.data.data.items));
            setAppList(response.data.data.items);
            console.log("Transaction List:", response.data.data.items);
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

    const handleChangePageNo = (value) => dispatch(setPageNo(value));
    const handleChangePageSize = (value) => {
        dispatch(setPageSize(value));
        dispatch(setPageNo(1));
    };

    const handleUpdateTransaction = (transaction) => {
        try {
            const response = APIInUse.put("Transaction/staff/update-payment/" + transaction.id);
            console.log(response);
        } catch (error) {
            console.error(error);
        }

        dispatch(setPageNo(1));
        handleLoadAppointmentList();
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

                                        return (
                                            <TableRow hover tabIndex={-1} key={row.id} sx={{ cursor: "pointer" }}>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={row.customerName} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>


                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={row.total + " VND"} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={formatDate(row.paymentDate)} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Text content={row.status} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                </TableCell>
                                                <TableCell align="center" padding="normal" className={"data-content"}>
                                                    <Accordion className="action-accordion">
                                                        <AccordionSummary
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                            className="action-accordion-summary"
                                                        >
                                                            <div className="action-accordion-summary-content">
                                                                <Text content={"..."} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                            </div>
                                                        </AccordionSummary>
                                                        <AccordionDetails className="action-accordion-details">
                                                            <div className="action-accordion-details-content"
                                                                onClick={() => handleUpdateTransaction(row)}
                                                            >
                                                                <Text content={"Xác nhận trả tiền"} type={"subtitle"} className={"data-content"} cursor={"pointer"} />
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" className="not-found-message">
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
                    <div className={`to-next-page ${pageNo >= totalPage ? 'disabled' : ''}`} onClick={() => handleChangePageNo(pageNo + 1)}>
                        <Text className="to-next-page-text" content={">"} />
                    </div>
                    <div className={`to-last-page ${pageNo >= totalPage ? 'disabled' : ''}`} onClick={() => handleChangePageNo(totalPage)}>
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

export { TransactionDataTable, DataTableHeader };
