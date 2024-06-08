import React from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../Atomic Components/pages/CommonLayout/CommonLayout";
import ScrollToTop from "./../Atomic Components/others/ScrollToTop";
import PetManagementPage from "../Atomic Components/pages/PetManagementPage/PetManagementPage";
import PetOverview from "../Atomic Components/organisms/PetManagement/Overview/PetOverview";
import PetProfile from "../Atomic Components/organisms/PetManagement/PetProfile/PetProfile";
import HomePage from "../Atomic Components/pages/HomePage/HomePage";
import {
	Accordion,
	AccordionHeader,
} from "../Atomic Components/molecules/Accordion/Accordion";

function AppRoutes() {
	return (
		<>
			<ScrollToTop>
				<Routes>
					<Route
						path="/"
						element={<CommonLayout />}
					>
						<Route
							path=""
							element={<HomePage />}
						></Route>
						<Route
							path="/your-pet"
							element={<PetManagementPage />}
						>
							<Route
								path="overview"
								element={<PetOverview />}
							/>
							<Route
								path="pet-profile/:petId"
								element={<PetProfile />}
							/>
						</Route>
					</Route>
					{/* <Route
						path="/accordion"
						element={
							<>
								<Accordion>
									<AccordionItem title="Section 1">
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
										<p>This is the content of Section 1.</p>
									</AccordionItem>
								</Accordion>
							</>
						}
					/> */}
				</Routes>
			</ScrollToTop>
		</>
	);
}

export default AppRoutes;
