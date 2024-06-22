import React from "react";
import './BookingPageTemplate.scss';
import BookingForm from "../../../organisms/BookingPage/BookingForm/BookingForm";

function BookingPageTemplate() {
    return (
        <>
            <div className="booking-page-background-container">
                <img
                    className="booking-page-background-image"
                    src="https://png.pngtree.com/background/20210716/original/pngtree-simple-cute-pet-dog-background-picture-image_1375478.jpg" alt="" />
            </div>

            <BookingForm />
        </>
    )

}

export default BookingPageTemplate;