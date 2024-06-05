import React from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../Atomic Components/pages/CommonLayout/CommonLayout";
import ScrollToTop from "./../Atomic Components/others/ScrollToTop";
import PetManagementPage from "../Atomic Components/pages/PetManagementPage/PetManagementPage";

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
								element={
									<>
										{/* <h1>hello</h1> */}
									</>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</ScrollToTop>
		</>
	);
}

export default AppRoutes;
