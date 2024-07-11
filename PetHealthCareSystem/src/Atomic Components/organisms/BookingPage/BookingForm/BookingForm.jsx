import React from "react";
import "./BookingForm.scss";
import Text from "../../../atoms/Text/Text";
import { useSelector, useDispatch } from "react-redux";
import {
    setSelectedVet,
    setSelectedPets,
    setSelectedDate,
    setSelectedServices,
    setBookingNote,
    setInputExceptions,
    reInitialSelectedVet,
    setServicesList,
    setSelectedTimeFrameId,
    setVets
} from "../../../../config/store/BookingForm/bookingForm";
import Button from "../../../atoms/Button/Button";
import VetInfoCard from "../../../molecules/VetInfoCard/VetInfoCard";
import APIInUse from "../../../../config/axios/AxiosInUse";
import SimplePetCard from "../../../molecules/SimplePetCard/SimplePetCard";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import TimeFrameCard from "../../../molecules/TimeFrameCard/TimeFrameCard";
import ServiceCard from "../../../molecules/ServiceCard/ServiceCard";
import { useNavigate } from "react-router-dom";

function BookingForm() {
    const dispatch = useDispatch();
    const selectedVet = useSelector((state) => state.bookingForm.selectedVet);
    const selectedPets = useSelector((state) => state.bookingForm.selectedPets);
    const selectedDate = useSelector((state) => state.bookingForm.selectedDate);
    const [vets, setVets] = React.useState(null);
    const [pets, setPets] = React.useState(null);
    const [timeFrames, setTimeFrames] = React.useState(null);
    const [selectedTimeFrame, setSelectedTimeFrame] = React.useState(null);
    const services = useSelector((state) => state.bookingForm.servicesList);
    const selectedServices = useSelector((state) => state.bookingForm.selectedServices);
    const bookingNote = useSelector((state) => state.bookingForm.bookingNote);
    const inputExceptions = useSelector((state) => state.bookingForm.inputExceptions);
    const navigate = useNavigate();

    const handleLoadPets = async () => {
        try {
            const response = await APIInUse.get("Pet/customer/all");
            setPets(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoadVet = async () => {
        if (selectedTimeFrame && selectedDate) {
            try {
                const response = await APIInUse.get(
                    "Appointment/free-vet-time-frames?Date=" + selectedDate + "&TimetableId=" + selectedTimeFrame.id
                );
                dispatch(setVets(response.data.data));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleLoadTimeFrames = async () => {
        try {
            const response = await APIInUse.get("Appointment/time-frames");
            setTimeFrames(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBookAppointment = async () => {
        const newInputExceptions = [];

        if (selectedPets.length === 0) {
            newInputExceptions.push("pet-input-exception");
        }

        if (!selectedVet || selectedVet.id === -1) {
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

        navigate('/booking/transaction');

        // try {
        //     const response = await APIInUse.post("Appointment/customer/book", {
        //         serviceIdList: selectedServices,
        //         vetId: selectedVet.id,
        //         note: bookingNote,
        //         timeTableId: selectedTimeFrame.id,
        //         appointmentDate: selectedDate,
        //         petIdList: selectedPets.map((pet) => pet.id),
        //     });
        //     console.log(response.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const handleLoadServices = async () => {
        try {
            const response = await APIInUse.get("Service/get-all");
            dispatch(setServicesList(response.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        handleLoadPets();
        handleLoadTimeFrames();
        handleLoadServices();
        dispatch(setInputExceptions([]));
        dispatch(setSelectedPets([]));
        dispatch(setSelectedServices([]));
        dispatch(reInitialSelectedVet());
        dispatch(setSelectedDate(format(new Date().setDate(new Date().getDate() + 1), "yyyy-MM-dd")));
    }, []);

    React.useEffect(() => {
        handleLoadVet();
    }, [selectedTimeFrame, selectedDate]);

    const handleDateChange = (date) => {
        dispatch(setSelectedDate(date));
    };

    // Calculate min and max dates for date picker
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1); // Tomorrow

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15); // 15 days later

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

    const handleTimeFrameClick = (timeFrame) => {
        if (selectedTimeFrame === timeFrame) {
            setSelectedTimeFrame(null);
        } else {
            setSelectedTimeFrame(timeFrame);
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

    const handleBookingNoteChange = (event) => {
        dispatch(setBookingNote(event.target.value));
    };

    const handleVetClick = (vet) => {
        if (selectedVet === vet) {
            dispatch(reInitialSelectedVet());
        } else {
            dispatch(setSelectedVet(vet));
        }
    }

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <div className="booking-form-container">
            <div className="booking-form-header">
                <Text className="booking-form-header-title" content="Mẫu đặt lịch khám" type="h1" />
                <Text className="booking-form-header-description" content="Vui lòng điền đầy đủ thông tin để tiến hành đặt lịch" type="p" />
            </div>

            <div className="booking-form-body">
                <div className="booking-form-body-add-pet">
                    <Text className="add-pet-label" content="Chọn thú cưng" type="p" />
                </div>

                <div className="added-pets-block">
                    {pets?.map((pet, index) => (
                        <SimplePetCard
                            key={index}
                            data={pet}
                            onClick={() => handlePetClick(pet)}
                            isSelected={selectedPets.some(selectedPet => selectedPet.id === pet.id)}
                        />
                    ))}
                    {inputExceptions.includes("pet-limit-exception") && (
                    <Text className="pet-limit-exception input-exception" content="Chỉ có thể chọn tối đa 3 thú cưng" type="p" />
                )}
                </div>

                {inputExceptions.includes("pet-input-exception") && (
                    <Text className="pet-input-exception input-exception" content="Vui lòng chọn thú cưng" type="p" />
                )}

                <div className="booking-form-body-select-service-label">
                    <Text className="select-service-label" content="Chọn dịch vụ" type="p" />
                </div>

                <div className="booking-form-body-select-service">
                    {services?.map((service, id) => (
                        <ServiceCard
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

                <div className="booking-form-select-date">
                    <Text className="select-date-label" content="Chọn ngày đặt lịch" type="p" />
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
                    {inputExceptions.includes("date-input-exception") && (
                        <Text className="date-input-exception input-exception" content="Vui lòng chọn ngày đặt lịch" type="p" />
                    )}
                </div>

                <div className="booking-form-select-time-slot">
                    {timeFrames?.map((timeFrame, index) => (
                        <TimeFrameCard
                            key={index}
                            data={timeFrame}
                            onClick={() => handleTimeFrameClick(timeFrame)}
                            isSelected={selectedTimeFrame === timeFrame}
                        />
                    ))}

                </div>

                {inputExceptions.includes("time-frame-input-exception") && (
                    <Text className="time-frame-input-exception input-exception" content="Vui lòng chọn giờ đặt lịch" type="p" />
                )}

                {selectedTimeFrame && (
                    <>
                        <div className="booking-form-body-select-vet">
                            <Text className="select-vet-label" content="Chọn bác sĩ" type="p" />
                        </div>
                        <div className="select-vet-block">
                            {vets?.length > 0 ? (
                                <><div className="booking-form-body-vets">
                                    {vets?.map((vet, index) => (
                                        <VetInfoCard
                                            key={index}
                                            data={vet}
                                            onClick={() => handleVetClick(vet)}
                                            isSelected={selectedVet?.id === vet.id}
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

                <div className="booking-form-note-input">
                    <Text className="note-input-label" content="Ghi chú" type="p" />
                    <textarea
                        className="note-input"
                        value={bookingNote}
                        onChange={handleBookingNoteChange}
                    />
                </div>

                <div className="booking-form-buttons-group">
                    <Button content="Hủy" className="cancel-button" onClick={handleCancel}/>
                    <Button content="Đặt lịch" className="confirm-button" onClick={handleBookAppointment} />
                </div>
            </div>
        </div>
    );
}

export default BookingForm;
