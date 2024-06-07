import React from "react";
import "./HomePageTemplate.scss";
import { Outlet } from "react-router-dom";
import BookAppointmentBody from "../../organisms/HomePage/BookAppointmentBody/BookAppointmentBody";
import HomePageBackground from "../../organisms/HomePage/HomePageBackground/HomePageBackGround";

function HomePageTemplate() {
    return (
        <>
            <HomePageBackground/>
            <div className="book-appointment-body">
                <BookAppointmentBody/>
            </div>
        </>
    );
}

export default HomePageTemplate;