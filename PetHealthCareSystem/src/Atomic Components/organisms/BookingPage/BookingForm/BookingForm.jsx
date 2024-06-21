import React from "react";
import "./BookingForm.scss";
import Text from "../../../atoms/Text/Text";
import { useSelector, useDispatch } from "react-redux";
import {
    setSelectedVet,
    setSelectedPets,
    setSelectedDate,
    setVets,
    setSelectedServices,
    clearSelectedVet
} from "../../../../config/store/BookingForm/bookingForm";
import Button from "../../../atoms/Button/Button";
import VetInfoCard from "../../../molecules/VetInfoCard/VetInfoCard";
import APIInUse from "../../../../config/axios/AxiosInUse";
import SimplePetCard from "../../../molecules/SimplePetCard/SimplePetCard";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import TimeFrameCard from "../../../molecules/TimeFrameCard/TimeFrameCard";
import ServiceCard from "../../../molecules/ServiceCard/ServiceCard";

function BookingForm() {
    const dispatch = useDispatch();
    const selectedVet = useSelector((state) => state.bookingForm.selectedVet);
    const selectedPets = useSelector((state) => state.bookingForm.selectedPets);
    const selectedDate = useSelector((state) => state.bookingForm.selectedDate);
    const [vets, setVets] = React.useState(null);
    const [pets, setPets] = React.useState(null);
    const [timeFrames, setTimeFrames] = React.useState(null);
    const [selectedTimeFrame, setSelectedTimeFrame] = React.useState(null);
    const [services, setServices] = React.useState(null);
    const selectedServices = useSelector((state) => state.bookingForm.selectedServices);

    const handleLoadPets = async () => {
        try {
            const response = await APIInUse.get("Pet/customer/all");
            console.log(response.data.data);
            setPets(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoadVet = async () => {
        if (selectedTimeFrame && selectedDate) {
            try {
                const response = await APIInUse.get("Appointment/customer/free-vet-time-frames?Date=" + selectedDate + "&TimetableId=" + selectedTimeFrame.id);
                dispatch(setVets(response.data.data));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleLoadTimeFrames = async () => {
        try {
            const response = await APIInUse.get("Appointment/customer/time-frames");
            setTimeFrames(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoadServices = async () => {
        try {
            const response = await APIInUse.get("Service/GetAllServiceAsync");
            setServices(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        handleLoadPets();
        handleLoadTimeFrames();
        handleLoadServices();
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
        if (selectedPets.includes(pet)) {
            dispatch(setSelectedPets(selectedPets.filter(selectedPet => selectedPet.id !== pet.id)));
        } else {
            dispatch(setSelectedPets([...selectedPets, pet]));
        }
    };

    const handleTimeFrameClick = (timeFrame) => {
        if (selectedTimeFrame === timeFrame) {
            setSelectedTimeFrame(null);
        } else {
            setSelectedTimeFrame(timeFrame);
        }
    };

    const handleServiceClick = (service) => {
        if (selectedServices.includes(service.name)) {
            dispatch(setSelectedServices(selectedServices.filter(selectedService => selectedService !== service.name)));
        } else {
            dispatch(setSelectedServices([...selectedServices, service.name]));
        }
    };

    const handleVetClick = (vet, e) => {
        if (selectedVet === vet) {
            dispatch(clearSelectedVet(e));
        } else {
            dispatch(setSelectedVet(vet));
        }
    };

    return (
        <div className="booking-form-container">
            <div className="booking-form-header">
                <Text
                    className={"booking-form-header-title"}
                    content={"Mẫu đặt lịch khám"}
                    type={"h1"}
                />
                <Text
                    className={"booking-form-header-description"}
                    content={
                        "Vui lòng điền đầy đủ thông tin để tiến hành đặt lịch"
                    }
                    type={"p"}
                />
            </div>

            <div className="booking-form-body">
                <div className="booking-form-body-add-pet">
                    <Text className={"add-pet-lable"} content={"Chọn thú cưng"} type={"p"} />
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
                </div>

                <div className="booking-form-body-select-service">
                    {services?.map((service, index) => (
                        <ServiceCard
                            key={index}
                            data={service}
                            onClick={() => handleServiceClick(service)}
                            isSelected={selectedServices.includes(service.name)}
                        />
                    ))}
                </div>

                <div className="booking-form-select-date">
                    <Text
                        className={"select-date-lable"}
                        content={"Chọn ngày đặt lịch"}
                        type={"p"}
                    />
                    <TextField
                        id="date-picker"
                        label="Ngày đặt lịch"
                        type="date"
                        defaultValue={format(minDate, "yyyy-MM-dd")} // Set default value to tomorrow
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: format(minDate, "yyyy-MM-dd"), // Minimum selectable date
                            max: format(maxDate, "yyyy-MM-dd"), // Maximum selectable date
                        }}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                </div>

                <div className="booking-form-select-time-slot">
                    {
                        timeFrames?.map((timeFrame, index) => (
                            <TimeFrameCard
                                key={index}
                                data={timeFrame}
                                onClick={() => handleTimeFrameClick(timeFrame)}
                                isSelected={selectedTimeFrame === timeFrame}
                            />
                        ))
                    }
                </div>

                <div className="booking-form-body-select-vet"
                    style={{ display: selectedTimeFrame === null ? "none" : "" }}
                >
                    <Text className={"select-vet-lable"} content={"Chọn bác sĩ"} type={"p"} />
                </div>

                <div className="select-vet-block"
                    style={{ display: selectedTimeFrame === null ? "none" : "" }}
                >
                    {vets?.length > 0 ? (
                        <div className="booking-form-body-vets">
                        {vets?.map((vet, index) => (
                            <VetInfoCard
                                key={index}
                                data={vet}
                                onClick={() => dispatch(setSelectedVet(vet))}
                                isSelected={selectedVet?.id === vet.id}
                            />
                        ))}
                    </div>
                    ) : (
                        <Text className={"no-vet-found"} content={"Không có bác sĩ phù hợp"} type={"p"} />
                    )}
                </div>

                <div className="booking-form-note-input">
                    <Text className={"note-input-lable"} content={"Ghi chú"} type={"p"} />
                    <textarea className={"note-input"} type={"text"} />
                </div>

                <div className="booking-form-buttons-group">
                    <Button content="Hủy" className={"cancel-button"} />
                    <Button content="Đặt lịch" className={"confirm-button"} />
                </div>
            </div>
        </div>
    );
}

function generateDates() {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 15; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        dates.push(currentDate);
    }
    console.log(dates);
    return dates;
}

export default BookingForm;
