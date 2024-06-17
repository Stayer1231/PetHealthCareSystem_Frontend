import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../Atomic Components/pages/CommonLayout/CommonLayout";
import ScrollToTop from "./../Atomic Components/others/ScrollToTop";
import PetManagementPage from "../Atomic Components/pages/PetManagementPage/PetManagementPage";
import PetOverview from "../Atomic Components/organisms/PetManagement/Overview/PetOverview";
import PetProfile from "../Atomic Components/organisms/PetManagement/PetProfile/PetProfile";
import HomePage from "../Atomic Components/pages/HomePage/HomePage";
import LoginPage from "../Atomic Components/pages/LoginPage/LoginPage";
import MyAccount from "../Atomic Components/organisms/PetManagement/MyAccount/MyAccount";
import RequireAuth from "../Atomic Components/templates/RequireAuth";
import PersistLogin from "../config/provider/PersistLogin";
import ServicesPage from "../Atomic Components/pages/ServicesPage/ServicesPage";
import BookingPage from "../Atomic Components/pages/BookingPage/BookingPage";
import { Toaster } from "react-hot-toast";

function AppRoutes() {
	return (
		<>
			<ScrollToTop>
				<Toaster position="top-right" />
				<Routes>
					{/* AUTHENTICATED ROUTES */}
					<Route element={<PersistLogin />}>
						<Route element={<RequireAuth />}>
							<Route
								path="/"
								element={<CommonLayout />}
							>
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
								/>
							</Route>
						</Route>
					</Route>

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
				</Routes>
			</ScrollToTop>
		</>
	);
}

export default AppRoutes;
