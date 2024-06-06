import React from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../Atomic Components/pages/CommonLayout/CommonLayout";
import ScrollToTop from "./../Atomic Components/others/ScrollToTop";
import PetManagementPage from "../Atomic Components/pages/PetManagementPage/PetManagementPage";
import PetOverview from "../Atomic Components/organisms/PetManagement/Overview/PetOverview";

function AppRoutes() {
	return (
		<>
			<ScrollToTop>
				<Routes>
					<Route
						path="/"
						element={<CommonLayout />}
					>
						{" "}
						<Route
							path="/your-pet"
							element={<PetManagementPage />}
						>
							<Route
								path="overview"
								element={<PetOverview />}
							/>
						</Route>
					</Route>
				</Routes>
			</ScrollToTop>
		</>
	);
}

export default AppRoutes;
