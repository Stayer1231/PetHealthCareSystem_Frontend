import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../Atomic Components/pages/CommonLayout/CommonLayout";
import PetManagementPage from "../Atomic Components/pages/PetManagementPage/PetManagementPage";
import PetOverview from "../Atomic Components/organisms/PetManagement/Overview/PetOverview";
import PetProfile from "../Atomic Components/organisms/PetManagement/PetProfile/PetProfile";
import HomePage from "../Atomic Components/pages/HomePage/HomePage";
import LoginPage from "../Atomic Components/pages/LoginPage/LoginPage";
import MyAccount from "../Atomic Components/organisms/PetManagement/MyAccount/MyAccount";
import PersistLogin from "../config/provider/PersistLogin";
import ServicesPage from "../Atomic Components/pages/ServicesPage/ServicesPage";
import BookingPage from "../Atomic Components/pages/BookingPage/BookingPage";
import { Toaster } from "react-hot-toast";
import RequireAuth from "../config/provider/RequireAuth";
import useAuth from "../config/provider/useAuth";
import ScrollToTop from "../others/ScrollToTop";
import VetCommonLayout from "../Atomic Components/pages/VetRole/CommonLayout/VetCommonLayout";
import VetHomePage from "../Atomic Components/pages/VetRole/VetHomePage/VetHomePage";
import WorkSchedulePage from "../Atomic Components/pages/VetRole/WorkSchedulePage/WorkSchedulePage";
import MedicalRecordPage from "../Atomic Components/pages/VetRole/MedicalRecordPage/MedicalRecordPage";
import HospitalizeRecordPage from "../Atomic Components/pages/VetRole/HospitalizeRecordPage/HospitalizeRecordPage";
import AdminPage from "../Atomic Components/pages/AdminPage/AdminPage";
import PatientDetailPage from "../Atomic Components/pages/VetRole/PatientDetailPage/PatientDetailPage";
import PatientPage from "../Atomic Components/pages/VetRole/PatientPage/PatientPage";
import TransactionForm from "../Atomic Components/organisms/BookingPage/TransactionForm/TransactionForm";
import BookingForm from "../Atomic Components/organisms/BookingPage/BookingForm/BookingForm";
import RegisterPage from "../Atomic Components/pages/RegisterPage/RegisterPage";
import BookingSuccess from "../Atomic Components/organisms/BookingPage/BookingSuccess/BookingSuccess";
import MyAppointment from "../Atomic Components/organisms/PetManagement/MyAppointment/MyAppointment";

function AppRoutes() {
	const { auth } = useAuth();

	return (
		<>
			<ScrollToTop>
				<Toaster position="top-right" />

				<Routes>
					{/* UNAUTHENTICATED ROUTES */}
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/register"
						element={<RegisterPage />}
					/>

					{!auth?.role && (
						<Route
							path="/"
							element={<CommonLayout />}
						>
							<Route
								index
								element={<HomePage />}
							/>
						</Route>
					)}

					{auth?.role == "Vet" && (
						<Route
							path="/"
							element={<VetCommonLayout />}
						>
							<Route
								index
								element={<VetHomePage />}
							/>
						</Route>
					)}

					{auth?.role == "Customer" && (
						<Route
							path="/"
							element={<CommonLayout />}
						>
							<Route
								index
								element={<HomePage />}
							/>
						</Route>
					)}

					{auth?.role == "Admin" && (
						<Route
							path="/"
							element={<AdminPage />}
						/>
					)}

					{/* AUTHENTICATED ROUTES */}
					<Route element={<PersistLogin />}>
						{/* ROUTES FOR VET */}
						<Route element={<RequireAuth allowedRoles={"Vet"} />}>
							<Route
								path="/"
								element={<VetCommonLayout />}
							>
								<Route
									index
									element={<VetHomePage />}
								/>
								<Route
									path="work-schedule"
									element={<WorkSchedulePage />}
								/>
								<Route path="medical-record">
									<Route
										index
										element={<MedicalRecordPage />}
									/>
									<Route
										path="patient-medical-record/:patientId"
										element={<PatientDetailPage />}
									/>
									<Route
										path="patient"
										element={<PatientPage />}
									/>
								</Route>
								<Route path="hospitalize-record">
									<Route
										index
										element={<HospitalizeRecordPage />}
									/>
									<Route
										path="hospitalize-info/:hospitalizeId"
										element={
											<>
												<h1>hello hehe chưa có gì hết</h1>
											</>
										}
									/>
								</Route>
							</Route>
						</Route>
						{/* ROUTES FOR ADMIN */}
						<Route element={<RequireAuth allowedRoles={"Admin"} />}>
							<Route
								path="/"
								element={<AdminPage />}
							/>
						</Route>
						{/* ROUTES FOR CUSTOMER */}
						<Route element={<RequireAuth allowedRoles={"Customer"} />}>
							<Route
								path="/"
								element={
									<>
										<CommonLayout />
									</>
								}
							>
								<Route
									index
									element={<HomePage />}
								/>
								<Route
									path="your-pet"
									element={<PetManagementPage />}
								>
									<Route
										path="overview"
										element={<PetOverview />}
									/>
									<Route
										path="my-account"
										element={<MyAccount />}
									/>
									<Route
										path="my-appointments"
										element={<MyAppointment />}
									/>
									<Route
										path="pet-profile/:petId"
										element={<PetProfile />}
									/>
								</Route>
								<Route
									path="services"
									element={<ServicesPage />}
								/>
								<Route
									path="booking"
									element={<BookingPage />}
								>
									<Route
										path="success"
										element={<BookingSuccess />}
									/>
									<Route
										path="form"
										element={<BookingForm />}
									/>
									<Route
										path="transaction"
										element={<TransactionForm />}
									/>
								</Route>
							</Route>
						</Route>
					</Route>
				</Routes>
			</ScrollToTop>
		</>
	);
}

export default AppRoutes;
