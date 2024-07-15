import React, { useState } from 'react';
import './ServiceList.scss';
import { ServiceDataTable } from '../../../molecules/StaffRole/ServiceDataTable/ServiceDataTable';
import { Modal, ModalBody, ModalHeader, ModalFooter } from '../../../molecules/Modal/Modal';
import Button from '../../../atoms/Button/Button';
import Text from '../../../atoms/Text/Text';
import {
    setInputExceptions,
    setShowModal,
    setServiceId,
    setServiceName,
    setServicedescription,
    setServicePice,
    setModalType
} from '../../../../config/store/StaffRole/staffRole';
import { useDispatch, useSelector } from 'react-redux';
import APIInUse from '../../../../config/axios/AxiosInUse';

function ServiceList() {
    const showModal = useSelector((state) => state.staffRole.showModal);
    const dispatch = useDispatch();
    const serviceName = useSelector((state) => state.staffRole.serviceName);
    const servicedescription = useSelector((state) => state.staffRole.servicedescription);
    const servicePice = useSelector((state) => state.staffRole.servicePice);
    const inputExceptions = useSelector((state) => state.staffRole.inputExceptions);
    const serviceId = useSelector((state) => state.staffRole.serviceId);
    const modalType = useSelector((state) => state.staffRole.modalType);

    const handleShowModal = () => {
        dispatch(setModalType("create"));
        dispatch(setShowModal(true));
    };

    const handleHideModal = () => {
        dispatch(setServiceName(''));
        dispatch(setServicedescription(''));
        dispatch(setServicePice(0));
        dispatch(setInputExceptions([]));
        dispatch(setModalType(""));
        dispatch(setShowModal(false));
    };

    const handleBookAppointment = async () => {
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
            const response = await APIInUse.post("Service/add", {
                name: serviceName,
                description: servicedescription,
                price: servicePice
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        handleHideModal();
    };

    const renderModal = () => (
        <Modal show={showModal} onHide={handleHideModal} className="custom-modal">
            <>
                <ModalHeader content="Thêm dịch vụ" className="custom-modal-header" />
                <ModalBody className="custom-modal-body">
                    <div className='input-container'>
                        <div className='input-label-container'>
                            <Text content="Tên dịch vụ" type="subtitle" textColor={"black"} className={"input-label"} />
                        </div>
                        <div className='input-container'>
                            <input
                                className="input"
                                type="text"
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
                    <Button className={"cancel-button"} onClick={handleHideModal} content='Hủy' />
                    <Button className={"create-button"} content='Tạo' onClick={handleBookAppointment} />
                </ModalFooter>
            </>
        </Modal>
    );

    return (
        <div>
            <div className='create-appointment-container'>
                <Button className={'create-appointment-button'} content='Tạo dịch vụ mới' onClick={handleShowModal} />
                {renderModal()}
            </div>

            <ServiceDataTable />
        </div>
    );
}

export default ServiceList;
