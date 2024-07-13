import React, { useState } from "react";
import "./MyAccout.scss";
import Text from "./../../../atoms/Text/Text";
import Button from "./../../../atoms/Button/Button";
import { AddIcon } from "../../../../assets/Icon/Icon";
import { Modal, ModalBody, ModalHeader } from "../../../molecules/Modal/Modal";
import useAuth from "./../../../../config/provider/useAuth";

function MyAccount() {
	const [showUpdateUserProfile, setShowUpdateUserProfile] = useState(false);
	const { auth } = useAuth();

	// USER MODAL PROFILE
	const openUpdateUserProfile = () => {
		setShowUpdateUserProfile(true);
	};

	const closeUpdateUserProfile = () => {
		setShowUpdateUserProfile(false);
	};

	return (
		<>
			<div className="my-account-container">
				<div className="personal-details-container">
					<div className="title-container">
						<Text
							content={"Thông Tin Cá Nhân"}
							type={"h3"}
						/>
						{/* <Button
							content="Update"
							rightIcon={<AddIcon />}
							variant="transparent"
							stroke
							onClick={openUpdateUserProfile}
						/> */}
					</div>
					<div className="info-container">
						<div className="user-fullname info-div">
							<Text
								content={"Họ và Tên:"}
								type={"subtitle"}
							/>
							<Text
								content={auth?.fullName}
								type={"subtitle"}
								className={"info-content"}
							/>
						</div>
						<div className="user-dob info-div">
							<Text
								content={"Ngày sinh:"}
								type={"subtitle"}
							/>
							<Text
								content={auth?.birthDate}
								type={"subtitle"}
								className={"info-content"}
							/>
						</div>
						<div className="user-phone info-div">
							<Text
								content={"Số điện thoại:"}
								type={"subtitle"}
							/>
							<Text
								content={auth?.phoneNumber}
								type={"subtitle"}
								className={"info-content"}
							/>
						</div>
					</div>

					<Modal
						show={showUpdateUserProfile}
						size={"sm"}
						onHide={closeUpdateUserProfile}
					>
						<ModalHeader />
						<ModalBody>
							<div className="update-user-profile-container">
								<div className="modal-title">
									<Text
										content={"Update Profile"}
										type={"h3"}
									/>
								</div>
								<div className="info-input-container">
									{/* USER FULLNAME */}
									<div className="user-fullname input-div">
										<Text
											content={"Full Name:"}
											className={"field-label"}
										/>
										<input
											type="text"
											className="general-input-field"
										/>
									</div>

									{/* USER EMAIL */}
									<div className="user-email input-div">
										<Text
											content={"Email:"}
											className={"field-label"}
										/>
										<input
											type="text"
											className="general-input-field"
										/>
									</div>

									{/* USER ADDRESS */}
									<div className="user-address input-div">
										<Text
											content={"Address: "}
											className={"field-label"}
										/>
										<input
											type="text"
											className="general-input-field"
										/>
									</div>

									{/* USER DOB */}
									<div className="user-dob input-div">
										<Text
											content={"Birthday: "}
											className={"field-label"}
										/>
										<input
											type="date"
											className="general-input-field"
										/>
									</div>

									{/* USER PHONE */}
									<div className="user-phone input-div">
										<Text
											content={"Phone Number:"}
											className={"field-label"}
										/>
										<select
											name=""
											id=""
											className="general-input-field"
										>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>
								</div>
								<div className="action-btn-container">
									<Button
										content="Save"
										onClick={closeUpdateUserProfile}
									/>
									<Button
										content="Cancel"
										variant="transparent"
										onClick={closeUpdateUserProfile}
									/>
								</div>
							</div>
						</ModalBody>
					</Modal>
				</div>
			</div>
		</>
	);
}

export default MyAccount;
