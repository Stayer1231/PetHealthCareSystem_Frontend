import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CommonLayout from "../Atomic Components/pages/CommonLayout/CommonLayout";
import ScrollToTop from "./../Atomic Components/others/ScrollToTop";
import PetManagementPage from "../Atomic Components/pages/PetManagementPage/PetManagementPage";
import PetOverview from "../Atomic Components/organisms/PetManagement/Overview/PetOverview";
import PetProfile from "../Atomic Components/organisms/PetManagement/PetProfile/PetProfile";
import HomePage from "../Atomic Components/pages/HomePage/HomePage";
import LoginPage from "../Atomic Components/pages/LoginPage/LoginPage";
import {
	Accordion,
	AccordionHeader,
	AccordionItem,
} from "../Atomic Components/molecules/Accordion/Accordion";
import {
	Modal,
	ModalBody,
	ModalHeader,
} from "../Atomic Components/molecules/Modal/Modal";

function AppRoutes() {
	const [show, setShow] = useState(false);

	const handleShowModal = () => {
		setShow(true);
	};

	const handleHideModal = () => {
		setShow(false);
	};

	return (
		<>
			<ScrollToTop>
				<Routes>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
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

					{/* TEST COMPONENT ROUTES */}
					<Route
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
					/>
					<Route
						path="/modal"
						element={
							<>
								<button onClick={handleShowModal}>Show Modal</button>
								<Modal
									show={show}
									onHide={handleHideModal}
								>
									<ModalHeader />
									<ModalBody>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
										<h1>h1</h1>
									</ModalBody>
								</Modal>
							</>
						}
					/>
				</Routes>
			</ScrollToTop>
		</>
	);
}

export default AppRoutes;
