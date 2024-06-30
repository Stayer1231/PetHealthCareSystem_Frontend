import React, { useEffect } from "react";
import "./HomePageTemplate.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import BookAppointmentBody from "../../organisms/HomePage/BookAppointmentBody/BookAppointmentBody";
import HomePageBackground from "../../organisms/HomePage/HomePageBackground/HomePageBackGround";
import HomePageServiceBlock from "../../organisms/HomePage/HomePageServiceBlock/HomePageServiceBlock";
import CustomerFeedbackBlock from "../../organisms/HomePage/CustomerFeedbackBlock/CustomerFeedbackBlock";
import VetInfoBlock from "../../organisms/HomePage/VetInfoBlock/VetInfoBlock";
import Toast from "../../molecules/ToasterNotification/ToasterNotification";

function HomePageTemplate() {
	// TOAST NOTIFICATION
	useEffect(() => {
		if (sessionStorage.getItem("successMessage")) {
			Toast({
				type: "success",
				message: sessionStorage.getItem("successMessage"),
				title: "Thành công",
			});
			sessionStorage.removeItem("successMessage");
		}
	}, []);
	return (
		<>
			<div className="book-appointment-body">
				<BookAppointmentBody />
			</div>
			<div className="home-page-service-block-container">
				<HomePageServiceBlock />
			</div>
			<div className="customer-feedback-container">
				<CustomerFeedbackBlock />
			</div>
			<div className="home-page-vet-info-block-container">
				<VetInfoBlock />
			</div>
		</>
	);
}

export default HomePageTemplate;
