import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./BookingSuccess.scss";
import Text from "../../../atoms/Text/Text";

function BookingSuccess() {
    const navigate = useNavigate();

    const handleReturnToHomePage = () => {
        navigate('/');
    };

    const handleSeeAppointmentList = () => {
        navigate('/appointments');
    };

    return (
        <div className="booking-success-page">
            <Text content="Your appointment has been successfully booked!" type={"h2"} className={"success-message"} />
            <div className="button-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReturnToHomePage}
                >
                    Return to Home Page
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSeeAppointmentList}
                >
                    See Appointment List
                </Button>
            </div>
        </div>
    );
}

export default BookingSuccess;