import React, { useEffect } from 'react'
import { AppointmentDataTable } from '../../../molecules/StaffRole/AppointmentDataTable/AppointmentDataTable'
import './AppointmentList.scss'
import { Modal, ModalBody, ModalHeader, ModalFooter } from '../../../molecules/Modal/Modal'
import { useState } from 'react'
import Button from '../../../atoms/Button/Button'
import Text from '../../../atoms/Text/Text'
import {
  setServices,
  setVets,
  setTimeTables,
  setSelectedDate,
  setSelectedTimeFrameId,
  setInputExceptions,
  setSelectedServices,
  setSelectedPets,
  setSelectedVetId,
  setBookingNote,
  setSelectedCustomer,
  setPhoneNumberInPut,
  setCustomerList,
  setPetList,
  setShowModal
} from '../../../../config/store/StaffRole/staffRole'
import { useDispatch, useSelector } from 'react-redux'
import APIInUse from '../../../../config/axios/AxiosInUse'
import ServiceCard from '../../../molecules/ServiceCard/ServiceCard'
import VetInfoCard from '../../../molecules/VetInfoCard/VetInfoCard'
import TimeFrameCard from '../../../molecules/TimeFrameCard/TimeFrameCard'
import SimplePetCard from '../../../molecules/SimplePetCard/SimplePetCard'
import { format, set } from "date-fns";
import { TextField } from '@mui/material'

function AppointmentList() {
  const showModal = useSelector((state) => state.staffRole.showModal);
  const dispatch = useDispatch();
  const services = useSelector((state) => state.staffRole.services);
  const vets = useSelector((state) => state.staffRole.vets);
  const timeTables = useSelector((state) => state.staffRole.timeTables);
  const selectedDate = useSelector((state) => state.staffRole.selectedDate);
  const selectedTimeFrame = useSelector((state) => state.staffRole.selectedTimeFrameId);
  const inputExceptions = useSelector((state) => state.staffRole.inputExceptions);
  const selectedServices = useSelector((state) => state.staffRole.selectedServices);
  const selectedPets = useSelector((state) => state.staffRole.selectedPets);
  const selectedVetId = useSelector((state) => state.staffRole.selectedVetId);
  const bookingNote = useSelector((state) => state.staffRole.bookingNote);
  const selectedCustomer = useSelector((state) => state.staffRole.selectedCustomer);
  const phoneNumberInPut = useSelector((state) => state.staffRole.phoneNumberInPut);
  const customerList = useSelector((state) => state.staffRole.customerList);
  const petList = useSelector((state) => state.staffRole.petList);

  const handleShowModal = () => dispatch(setShowModal(true));
  const handleHideModal = () => {
    // Reset all state values here
    dispatch(setServices([]));
    dispatch(setVets([]));
    dispatch(setTimeTables([]));
    dispatch(setSelectedDate(''));
    dispatch(setSelectedTimeFrameId(0));
    dispatch(setInputExceptions([]));
    dispatch(setSelectedServices([]));
    dispatch(setSelectedPets([]));
    dispatch(setSelectedVetId(0));
    dispatch(setBookingNote(''));
    dispatch(setSelectedCustomer(null));
    dispatch(setPhoneNumberInPut(''));
    dispatch(setCustomerList([]));
    dispatch(setPetList([]));

    handleLoadBookData();

    dispatch(setShowModal(false));
  };

  const handleLoadBookData = async () => {
    try {
      const response = await APIInUse.get(`Service/get-all`);
      dispatch(setServices(response.data.data));
      console.log(response.data.data);
    }
    catch (error) {
      console.log(error);
    }

    try {
      const response = await APIInUse.get(`Appointment/time-frames`);
      dispatch(setTimeTables(response.data.data));
      console.log(response.data.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleLoadBookData();
    dispatch(setSelectedDate(format(new Date().setDate(new Date().getDate()), "yyyy-MM-dd")));
  }, [])

  React.useEffect(() => {
    handleLoadVet();
  }, [selectedTimeFrame, selectedDate]);

  const minDate = new Date();

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15); // 15 days later

  const handleLoadVet = async () => {
    if (selectedTimeFrame && selectedDate) {
      try {
        const response = await APIInUse.get(
          "Appointment/free-vet-time-frames?Date=" + selectedDate + "&TimetableId=" + selectedTimeFrame
        );
        dispatch(setVets(response.data.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleVetClick = (vet) => {
    if (selectedVetId === vet.id) {
      dispatch(setSelectedVetId(0));
    } else {
      dispatch(setSelectedVetId(vet.id));
    }
  }

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
  };

  const handleTimeFrameClick = (timeFrame) => {
    if (selectedTimeFrame === timeFrame) {
      dispatch(setSelectedTimeFrameId(0));
    } else {
      dispatch(setSelectedTimeFrameId(timeFrame.id));
    }
  };

  const handleServiceClick = (service) => {
    if (selectedServices.includes(service.id)) {
      dispatch(setSelectedServices(selectedServices.filter(selectedService => selectedService !== service.id)));
    } else if (selectedServices.length < 3) {
      dispatch(setSelectedServices([...selectedServices, service.id]));
      dispatch(setInputExceptions(inputExceptions.filter(exception => exception !== "service-limit-exception")));
    } else {
      dispatch(setInputExceptions([...inputExceptions, "service-limit-exception"]));
    }
  };

  const handleCustomerLoad = async () => {
    try {
      const respone = await APIInUse.get("Auth/customer-account?phoneNumber=" + phoneNumberInPut);
      console.log(respone.data.data);
      dispatch(setCustomerList(respone.data.data));
      console.log(customerList);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleLoadPets = async () => {
    try {
      const response = await APIInUse.get("/Pet/customer/all/" + selectedCustomer.id);
      dispatch(setPetList(response.data.data));
      console.log(response.data.data);
      console.log(petList);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handlePetClick = (pet) => {
    if (selectedPets.some(selectedPet => selectedPet.id === pet.id)) {
        dispatch(setSelectedPets(selectedPets.filter(selectedPet => selectedPet.id !== pet.id)));
    } else if (selectedPets.length < 3) {
        dispatch(setSelectedPets([...selectedPets, pet]));
        dispatch(setInputExceptions(inputExceptions.filter(exception => exception !== "pet-limit-exception")));
    } else {
        dispatch(setInputExceptions([...inputExceptions, "pet-limit-exception"]));
    }
};

  useEffect(() => {
    handleLoadPets();
  }, [selectedCustomer]);

  const handlePhoneNumberChange = (event) => {
    dispatch(setPhoneNumberInPut(event.target.value));
  }

  const handleBookingNoteChange = (event) => {
    dispatch(setBookingNote(event.target.value));
};

  const handleCustomerClick = (customer) => {
    dispatch(setSelectedCustomer(customer));
    console.log(selectedCustomer);
    dispatch(setPhoneNumberInPut('')); // Clear phone number input
    dispatch(setCustomerList([])); // Clear customer list
    dispatch(setInputExceptions(inputExceptions.filter(exception => exception !== "customer-input-exception")));
  }

  useEffect(() => {
    handleCustomerLoad();
  }, [phoneNumberInPut]);

  // const handlePetsLoad = async () => {
  //   try {
  //     const response = await APIInUse.get("Pet/get-pets-by-vet?VetId=" + selectedVetId);
  //   }
  // }

  const handleBookAppointment = async () => {
    const newInputExceptions = [];

    if (selectedCustomer === null) {
      newInputExceptions.push("customer-input-exception");
    }

    if (selectedPets.length === 0) {
      newInputExceptions.push("pet-input-exception");
    }

    if (!selectedVetId || selectedVetId === 0) {
      newInputExceptions.push("vet-input-exception");
    }

    if (!selectedDate) {
      newInputExceptions.push("date-input-exception");
    }

    if (!selectedTimeFrame) {
      newInputExceptions.push("time-frame-input-exception");
    }

    if (selectedPets.length > 3) {
      newInputExceptions.push("pet-limit-exception");
    }

    if (selectedServices.length > 3) {
      newInputExceptions.push("service-limit-exception");
    }

    dispatch(setInputExceptions(newInputExceptions));

    if (newInputExceptions.length > 0) {
      return;
    }

    try {
      const response = await APIInUse.post("Appointment/book", {
        serviceIdList : selectedServices,
        vetId: selectedVetId,
        customerId: selectedCustomer.id,
        note: bookingNote,
        timeTableId: selectedTimeFrame,
        appointmentDate: selectedDate,
        petIdList: selectedPets?.map((pet) => pet.id)
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    handleHideModal();
  };


  const renderModal = () => (

    <Modal show={showModal} onHide={handleHideModal} className="custom-modal">
      <ModalHeader content="Tạo cuộc hẹn" className="custom-modal-header" />
      <ModalBody className="custom-modal-body">
        <Text content="Tìm khách hàng" type="subtitle" textColor={"black"} />
        <div className='search-customer'>
          <input
            type="text"
            maxLength="11"
            value={phoneNumberInPut}
            placeholder='Số điện thoại'
            onChange={(event) => handlePhoneNumberChange(event)} />

          {/* Show customer list only if there is text in the search input */}
          {phoneNumberInPut && phoneNumberInPut.length > 0 && (
            <div className='customer-list'>
              {customerList?.map((customer) => (
                <div className='customer-card' key={customer.id}
                  onClick={() => handleCustomerClick(customer)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className='customer-name'>
                    <Text className={"customer-name-text"} content={customer.fullName} />
                  </div>
                  <div className='customer-phone'>
                    <Text className={"customer-phone-text"} content={customer.phoneNumber} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedCustomer !== null && (
          <div className='selected-customer'>
            <Text
              className="selected-customer-text"
              content={selectedCustomer?.fullName}
            />
            <Text
              className="selected-customer-phone"
              content={selectedCustomer?.phoneNumber}
            />
            <Text
              className="selected-customer-email"
              content={selectedCustomer?.email}
            />
          </div>
        )}

        {inputExceptions.includes("customer-input-exception") && (
          <Text className="customer-input-exception input-exception" content="Chọn khách hàng" type="p" />
        )}

        <div className="input-form">
          <Text
            content="Chọn thú cưng"
            type="subtitle"
            textColor={"black"} />
        </div>

        <div className='select-form'>
          {petList?.map((pet, id) => (
            <SimplePetCard
              className="pet-card"
              key={id}
              data={pet}
              onClick={() => handlePetClick(pet)}
              isSelected={selectedPets.some(selectedPet => selectedPet.id === pet.id)}
            />
          ))}
        </div>

        {inputExceptions.includes("pet-input-exception") && (
          <Text className="pet-input-exception input-exception" content="Chọn thú cưng" type="p" />
        )}

        {inputExceptions.includes("pet-limit-exception") && (
          <Text className="pet-limit-exception input-exception" content="Chọn tối đa 3 thú cưng" type="p" />
        )}

        <div className="input-form">
          <Text
            content="Chọn dịch vụ"
            type="subtitle"
            textColor={"black"} />
        </div>

        <div className='select-form'>
          {services?.map((service, id) => (
            <ServiceCard
              className="service-card"
              key={id}
              data={service}
              onClick={() => handleServiceClick(service)}
              isSelected={selectedServices.some(selectedService => selectedService === service.id)}
            />
          ))}
        </div>

        {inputExceptions.includes("service-limit-exception") && (
          <Text className="service-limit-exception input-exception" content="Chỉ có thể chọn tối đa 3 dịch vụ" type="p" />
        )}

        <div className="input-form">
          <Text className="select-date-label" content="Chọn ngày đặt lịch" type="subtitle" />
          <TextField
            id="date-picker"
            label="Ngày đặt lịch"
            type="date"
            defaultValue={format(minDate, "yyyy-MM-dd")}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: format(minDate, "yyyy-MM-dd"),
              max: format(maxDate, "yyyy-MM-dd"),
            }}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>

        {inputExceptions.includes("date-input-exception") && (
          <Text className="date-input-exception input-exception" content="Vui lòng chọn ngày đặt lịch" type="p" />
        )}

        <div className="input-form">
          <Text
            content="Chọn khung giờ"
            type="subtitle"
            textColor={"black"} />
        </div>

        <div className="select-form">
          {timeTables?.map((timeFrame, index) => (
            <TimeFrameCard
              key={index}
              data={timeFrame}
              onClick={() => handleTimeFrameClick(timeFrame)}
              isSelected={selectedTimeFrame === timeFrame.id}
            />
          ))}
        </div>

        {inputExceptions.includes("time-frame-input-exception") && (
          <Text className="time-frame-input-exception input-exception" content="Vui lòng chọn giờ đặt lịch" type="p" />
        )}

        <div className="input-form">
          <Text
            content="Chọn bác sĩ"
            type="subtitle"
            textColor={"black"} />
        </div>

        {selectedTimeFrame && (
          <>
            <div className="">
              {vets?.length > 0 ? (
                <><div className="select-form">
                  {vets?.map((vet, index) => (
                    <VetInfoCard
                      style={{ margin_bottom : "10px" }}
                      key={index}
                      data={vet}
                      onClick={() => handleVetClick(vet)}
                      isSelected={selectedVetId === vet.id}
                    />
                  ))}
                </div>
                  {inputExceptions.includes("vet-input-exception") && (
                    <Text className="vet-input-exception input-exception" content="Vui lòng chọn bác sĩ" type="p" />
                  )}
                </>
              ) : (
                <Text className="no-vet-found" content="Không có bác sĩ phù hợp" type="p" />
              )}
            </div>
          </>
        )}

        <div className="input-form">
          <Text
            content="Ghi chú"
            type="subtitle"
            textColor={"black"} />
          <textarea
            className="note-input"
            value={bookingNote}
            onChange={handleBookingNoteChange}
          />
        </div>

      </ModalBody>
      <ModalFooter className="custom-modal-footer">
        <Button className={"cancel-button"} onClick={handleHideModal} content='Hủy' />
        <Button className={"create-button"} content='Tạo' onClick={() => handleBookAppointment()} />
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      <div>

        <div className='create-appointment-container'>
          <Button className={'create-appointment-button'} content='Tạo cuộc hẹn mới' onClick={handleShowModal} />
          {renderModal()}
        </div>

        <AppointmentDataTable />
      </div>
    </>
  )
}

export default AppointmentList
