import React from "react";
import "./HomePageTemplate.scss";
import { Outlet } from "react-router-dom";
import BookAppointmentBody from "../../organisms/HomePage/BookAppointmentBody/BookAppointmentBody";
import HomePageBackground from "../../organisms/HomePage/HomePageBackground/HomePageBackGround";
import HomePageServiceBlock from "../../organisms/HomePage/HomePageServiceBlock/HomePageServiceBlock";

function HomePageTemplate() {
    return (
        <>
            <HomePageBackground/>
            <div className="book-appointment-body">
                <BookAppointmentBody/>
            </div>
            <div className="home-page-service-block-container">
                <HomePageServiceBlock/>
            </div>
        </>
    );
}

export default HomePageTemplate;