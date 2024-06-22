import React, { useEffect, useState } from "react";
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
import TransactionForm from "../Atomic Components/organisms/BookingPage/TransactionForm/TransactionForm";
import BookingForm from "../Atomic Components/organisms/BookingPage/BookingForm/BookingForm";

function AppRoutes() {
	const { auth } = useAuth();

	return (
		<>
			<ScrollToTop>
				<Toaster position="top-right" />

				<Routes>
					{!auth?.role ? (
						<>
							{/* UNAUTHENTICATED ROUTES */}
							<Route
								path="/login"
								element={<LoginPage />}
							/>

							<Route
								path="/"
								element={<CommonLayout />}
							>
								<Route
									index
									element={<HomePage />}
								/>
							</Route>
							<Route element={<RequireAuth />}>
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
											path="transaction"
											element={<TransactionPage />}
										/>
									</Route>
									<Route
										path="/login"
										element={<LoginPage />}
									/>
								</Route>
							</Route>

						</>
					) : auth?.role == "Vet" ? (
						<>
							{/* ROUTES FOR STAFF */}
							<Route element={<RequireAuth allowedRoles={"Vet"} />}>
								<Route
									path="/"
									element={<VetCommonLayout />}
								>
									<Route index element={<VetHomePage />} />
								</Route>

								<Route
									path="/login"
									element={<LoginPage />}
								/>
							</Route>
						</>
					) : (
						<>
							{/* AUTHENTICATED ROUTES */}
							<Route element={<PersistLogin />}>
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
												path="form"
												element={<BookingForm />}
											/>
											<Route
												path="transaction"
												element={<TransactionForm />}
											/>
										</Route>
										<Route
											path="/login"
											element={<LoginPage />}
										/>
									</Route>
								</Route>
							</Route>
						</>
					)}
				</Routes>
			</ScrollToTop>
		</>
	);
}

export default AppRoutes;
