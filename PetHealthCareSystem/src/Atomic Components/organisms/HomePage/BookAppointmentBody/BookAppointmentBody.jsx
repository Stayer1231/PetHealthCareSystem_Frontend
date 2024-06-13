import React from "react";
import Text from "../../../atoms/Text/Text";
import Button from "../../../atoms/Button/Button";
import './BookAppointmentBody.scss'
import { Link } from "react-router-dom";

function BookAppointmentBody() {
    return (
        <>
            <div className='user-book-appointment-controller-container'>
                <div className="user-book-appointment-controller">
                    <Text
                        content={'Everything Veterinary Care For Your Everything Companion'}
                        className={'user-book-appointment-controller-title-text'}
                        type={'h2'}
                    />

                    <Text
                        content={'Primary, specialty, & emergency care that meets all of your pets healthcare needs.'}
                        className={"user-book-appointment-controller-detail-text"}
                        type={'h4'}
                    />
                    <Link to={"/booking"}
                        className="booking-link">
                        <Button
                            content="Book Appointment"
                            className={'user-book-appointment-controller-button'}
                        />
                    </Link>
                </div>
                <div className="user-book-appointment-controller-img-container">
                    <img src="https://images.ctfassets.net/8hq8guzcncfs/gBh0U7Yt94KdxO8H6bvzV/f76e3d19224091f28fda339a6b640396/d2.png?fm=webp" alt="" />
                </div>
            </div>
        </>
    )
}

export default BookAppointmentBody;