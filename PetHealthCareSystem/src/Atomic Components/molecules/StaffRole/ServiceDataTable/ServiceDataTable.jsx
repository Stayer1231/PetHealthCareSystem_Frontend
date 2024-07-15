import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIInUse from "../../../../config/axios/AxiosInUse";
import {
    setPageNo,
    setPageSize,
    setServices,
    setServiceName,
    setServicedescription,
    setServicePice,
    setServiceId,
    setShowModal,
    setModalType,
    setShowEditModal,
    setInputExceptions
} from "../../../../config/store/StaffRole/staffRole";
import { Modal, ModalBody, ModalHeader, ModalFooter } from '../../../molecules/Modal/Modal';
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
    AccordionDetails,
} from "@mui/material";
import Button from '../../../atoms/Button/Button';
import Text from "../../../atoms/Text/Text";
import './ServiceDataTable.scss';

const DataTableHeader = () => {
    const columnMapping = [
        "Id", "Tên dịch vụ", "Mô tả", "Giá cả", "Thao tác"
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

const ServiceDataTable = () => {
    const dispatch = useDispatch();
    const pageNo = useSelector((state) => state.staffRole.pageNo);
    const pageSize = useSelector((state) => state.staffRole.pageSize);
    const showModal = useSelector((state) => state.staffRole.showModal);
    const showEditModal = useSelector((state) => state.staffRole.showEditModal);
    const serviceName = useSelector((state) => state.staffRole.serviceName);
    const servicedescription = useSelector((state) => state.staffRole.servicedescription);
    const servicePice = useSelector((state) => state.staffRole.servicePice);
    const inputExceptions = useSelector((state) => state.staffRole.inputExceptions);
    const serviceId = useSelector((state) => state.staffRole.serviceId);
    const modalType = useSelector((state) => state.staffRole.modalType);
    const [appList, setAppList] = useState([]);
    const [paginatedList, setPaginatedList] = useState([]);
    const totalPage = Math.ceil(appList.length / pageSize);

    const handleLoadAppointmentList = async () => {
        try {
            const response = await APIInUse.get(`Service/get-all`);
            dispatch(setServices(response.data.data));
            setAppList(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleLoadAppointmentList();
    }, [showModal, showEditModal]);

    useEffect(() => {
        const start = (pageNo - 1) * pageSize;
        const end = start + pageSize;
        setPaginatedList(appList.slice(start, end));
    }, [appList, pageNo, pageSize]);

    const handleChangePageNo = (value) => dispatch(setPageNo(value));
    const handleChangePageSize = (value) => {
        dispatch(setPageSize(value));
        dispatch(setPageNo(1));
    };

    const handleDeleteService = async (id) => {
        try {
            await APIInUse.delete(`Service/${id}`);
            handleLoadAppointmentList();
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowEditModal = (service) => {
        dispatch(setServiceName(service.name));
        dispatch(setServicedescription(service.description));
        dispatch(setServicePice(service.price));
        dispatch(setServiceId(service.id));
        dispatch(setShowEditModal(true));
        dispatch(setModalType("edit"));
    };

    const handleHideEditModal = () => {
        dispatch(setShowEditModal(false));
    };

    const handleSaveService = async () => {
        const newInputExceptions = [];

        if (serviceName === '') {
            newInputExceptions.push('service-name-empty');
        }

        if (servicePice <= 10000) {
            newInputExceptions.push('service-price-empty');
        }

        dispatch(setInputExceptions(newInputExceptions));

        if (newInputExceptions.length > 0) {
            return;
        }

        try {
            await APIInUse.put("Service/update", {
                id: serviceId,
                name: serviceName,
                description: servicedescription,
                price: servicePice
            });
            handleLoadAppointmentList();
        } catch (error) {
            console.log(error);
        }

        handleHideEditModal();
    };

    const renderModal = () => (
        <Modal show={showEditModal} onHide={handleHideEditModal} className="custom-modal">
            <ModalHeader content="Sửa dịch vụ" className="custom-modal-header" />
            <ModalBody className="custom-modal-body">
                <div className='input-container'>
                    <div className='input-label-container'>
                        <Text content="Tên dịch vụ" type="subtitle" textColor={"black"} className={"input-label"} />
                    </div>
                    <div className='input-container'>
                        <input
                            className="input"
                            type="text"
                            value={serviceName}
                            placeholder="Tên dịch vụ"
                            onChange={(event) => dispatch(setServiceName(event.target.value))}
                        />
                    </div>
                </div>

                {inputExceptions.includes("service-name-empty") && (
                    <Text content="Vui lòng nhập tên dịch vụ" type="subtitle" textColor={"red"} className={"input-exception"} />
                )}

                <div className='input-container'>
                    <div className='input-label-container'>
                        <Text content="Ghi chú" type="subtitle" textColor={"black"} className={"input-label"} />
                    </div>
                    <div className='input-container'>
                        <textarea
                            className="input-description"
                            value={servicedescription}
                            placeholder="Ghi chú"
                            onChange={(event) => dispatch(setServicedescription(event.target.value))}
                        />
                    </div>
                </div>

                <div className='input-container'>
                    <div className='input-label-container'>
                        <Text content="Giá(>=10000 VND)" type="subtitle" textColor={"black"} className={"input-label"} />
                    </div>
                    <div className='input-container'>
                        <input
                            className="input"
                            type="number"
                            value={servicePice}
                            placeholder="Giá(VND)"
                            min="10000"
                            onChange={(event) => dispatch(setServicePice(event.target.value))}
                        />
                    </div>
                </div>

                {inputExceptions.includes("service-price-empty") && (
                    <Text content="Vui lòng nhập giá" type="subtitle" textColor={"red"} className={"input-exception"} />
                )}
            </ModalBody>
            <ModalFooter className="custom-modal-footer">
                <Button className={"cancel-button"} onClick={handleHideEditModal} content='Hủy' />
                <Button className={"create-button"} content='Lưu' onClick={handleSaveService} />
            </ModalFooter>
        </Modal>
    );

    return (
        <div className="table-container">
            <Box className="box">
                <Paper className="paper">
                    <TableContainer className="table-container">
                        <Table className="table" aria-labelledby="tableTitle">
                            <DataTableHeader />
                            <TableBody>
                                {paginatedList && paginatedList.length > 0 ? (
                                    paginatedList.map((row) => (
                                        <TableRow hover tabIndex={-1} key={row.id} className="table-row">
                                            <TableCell align="center" padding="normal" className="table-cell data-content">
                                                <Text content={row.id} type="subtitle" className="data-content" />
                                            </TableCell>
                                            <TableCell align="center" padding="normal" className="table-cell data-content">
                                                <Text content={row.name} type="subtitle" className="data-content" />
                                            </TableCell>
                                            <TableCell align="center" padding="normal" className="table-cell data-content">
                                                <Text content={row.description} type="subtitle" className="data-content" />
                                            </TableCell>
                                            <TableCell align="center" padding="normal" className="table-cell data-content">
                                                <Text content={new Intl.NumberFormat('de-DE').format(row.price) + " VND"} type="subtitle" className="data-content" />
                                            </TableCell>
                                            <TableCell align="center" padding="normal" className="table-cell data-content">
                                                <Accordion className="accordion">
                                                    <AccordionSummary
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                        className="accordion-summary-root"
                                                    >
                                                        <div className="action-accordion-summary-content">
                                                            <Text content="..." type="subtitle" className="data-content" />
                                                        </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails className="accordion-details-root">
                                                        <div
                                                            className="action-accordion-details-content"
                                                            onClick={() => handleShowEditModal(row)}
                                                        >
                                                            <Text content="Sửa dịch vụ" type="subtitle" className="data-content" />
                                                        </div>
                                                        <br />
                                                        <div
                                                            className="action-accordion-details-content"
                                                            onClick={() => handleDeleteService(row.id)}
                                                        >
                                                            <Text content="Xóa dịch vụ" type="subtitle" className="data-content" />
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" className="not-found-message">
                                            <Text content="Chưa có thông tin" type="h6" textColor="red" />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Box className="pagination-container">
                    <div className={`pagination-button to-first-page ${pageNo === 1 ? 'disabled' : ''}`} onClick={() => handleChangePageNo(1)}>
                        <Text className="pagination-text" content="<<" />
                    </div>
                    <div className={`pagination-button to-previous-page ${pageNo === 1 ? 'disabled' : ''}`} onClick={() => handleChangePageNo(pageNo - 1)}>
                        <Text className="pagination-text" content="<" />
                    </div>
                    <div className="page-number">
                        <Text className="page-number-text" content={pageNo} />
                    </div>
                    <div className={`pagination-button to-next-page ${pageNo >= totalPage ? 'disabled' : ''}`} onClick={() => handleChangePageNo(pageNo + 1)}>
                        <Text className="pagination-text" content=">" />
                    </div>
                    <div className={`pagination-button to-last-page ${pageNo >= totalPage ? 'disabled' : ''}`} onClick={() => handleChangePageNo(totalPage)}>
                        <Text className="pagination-text" content=">>" />
                    </div>
                </Box>
                <Box className="page-size">
                    <Text content="Số dòng mỗi trang" type="subtitle" className="page-size-text" />
                    <Select value={pageSize} onChange={(e) => handleChangePageSize(e.target.value)} className="page-size-select">
                        {[10, 20, 50, 100].map((size) => (
                            <MenuItem value={size} key={size}>{size}</MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>

            {renderModal()}
        </div>
    );
};

export { ServiceDataTable, DataTableHeader };
