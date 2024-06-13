import React from "react";
import './BookingForm.scss'
import Text from "../../../atoms/Text/Text";
import { useSelector, useDispatch } from "react-redux";
import {
    setSelectedVet,
    setSelectedPets,
    setSelectedDate,
    setVets
} from "../../../../config/store/BookingForm/bookingForm";
import Button from "../../../atoms/Button/Button";
import VetInfoCard from "../../../molecules/VetInfoCard/VetInfoCard";
import APIInUse from "../../../../config/axios/AxiosInUse";

function BookingForm() {
    const dispatch = useDispatch();
    const selectedVet = useSelector((state) => state.bookingForm.selectedVet);
    const selectedPets = useSelector((state) => state.bookingForm.selectedPets);
    const selectedDate = useSelector((state) => state.bookingForm.selectedDate);
    const dates = generateDates();
    const vets = useSelector((state) => state.bookingForm.vets);

    const handleLoadVet = async () => {
        try {
            const response = await APIInUse.get('Vet/list');
            dispatch(setVets(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleLoadVet();
    }, []);

    return (
        <>
            <div className="booking-form-container">
                <div className="booking-form-header">
                    <Text
                        className={"booking-form-header-title"}
                        content={'Mẫu đặt lịch khám'}
                        type={'h1'}
                    />

                    <Text
                        className={"booking-form-header-description"}
                        content={'Vui lòng điền đầy đủ thông tin để tiến hành đặt lịch'}
                        type={'p'}
                    />
                </div>

                <div className="booking-form-body">
                    <div className="booking-form-body-add-pet">
                        <Text className={'add-pet-lable'} content={'Thêm thú cưng'} type={'p'} />
                        <input className={'add-pet-input'} type={'text'} placeholder={'Tìm theo tên của thú cưng'} />

                        <div className="pet-seach-result">

                        </div>
                    </div>

                    <div className="added-pets-block">

                    </div>

                    <div className="booking-form-select-date">
                        <Text className={'select-date-lable'} content={'Chọn ngày đặt lịch'} type={'p'} />

                        <div className="select-date-block-container">
                            {
                                dates?.map((date, index) => {
                                    return (<>
                                        {selectedDate !== date.toLocaleDateString("en-GB") ?
                                            <>
                                                <div
                                                    className="select-date-block"
                                                    key={index}
                                                    onClick={() => dispatch(setSelectedDate(date.toLocaleDateString("en-GB")))}
                                                >
                                                    <Text className={'select-date-block-text'} content={date.toLocaleDateString("en-GB")} type={'p'} />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="select-date-block"
                                                    key={index}
                                                    id="selected-date-block">
                                                    <Text className={'select-date-block-text'} content={date.toLocaleDateString("en-GB")} type={'p'} />
                                                </div>
                                            </>
                                        }
                                    </>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <div className="booking-form-select-time-slot">

                    </div>

                    <div className="booking-form-body-select-vet">
                        <Text className={'select-vet-lable'} content={'Chọn bác sĩ'} type={'p'} />
                        <input className={'select-vet-input'} type={'text'} placeholder="Tìm theo tên bác sĩ" />
                    </div>

                    <div className="select-vet-block">
                        {vets?.map((vet, index) => {
                            return (
                                <>
                                    {selectedVet?.id === vet?.id ?
                                        <>
                                            <div className={'vet-info-card'} id="selected-vet-card">
                                                <VetInfoCard
                                                    key={index}
                                                    data={vet}
                                                    onClick={() => dispatch(setSelectedVet(vet))}
                                                    displayMessage={false}
                                                />
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className={'vet-info-card'}
                                                onClick={() => dispatch(setSelectedVet(vet))}
                                            >
                                                <VetInfoCard
                                                    key={index}
                                                    data={vet}
                                                    displayMessage={false}
                                                />
                                            </div>
                                        </>
                                    }
                                </>
                            );
                        })}
                    </div>

                    <div className="booking-form-note-input">
                        <Text className={'note-input-lable'} content={'Ghi chú'} type={'p'} />
                        <textarea className={'note-input'} type={'text'} />
                    </div>

                    <div className="booking-form-buttons-group">
                        <Button content="Hủy" className={'cancel-button'} />
                        <Button content="Đặt lịch" className={'confirm-button'} />
                    </div>

                </div>
            </div>
        </>
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