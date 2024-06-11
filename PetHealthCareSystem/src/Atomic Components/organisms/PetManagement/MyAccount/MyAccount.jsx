import React from "react";
import "./MyAccout.scss";
import Text from "./../../../atoms/Text/Text";
import Button from "./../../../atoms/Button/Button";
import { AddIcon } from "../../../../assets/Icon/Icon";

function MyAccount() {
	return (
		<>
			<div className="my-account-container">
				<div className="personal-details-container">
					<div className="title-container">
						<Text
							content={"Personal Details"}
							type={"h3"}
						/>
						<Button
							content="Update"
							rightIcon={<AddIcon />}
                            variant="transparent"
                            stroke
						/>
					</div>
					<div className="info-container">
						<div className="user-fullname info-div">
							<Text
								content={"Full Name:"}
								type={"subtitle"}
							/>
							<Text
								content={"Nguyen Van A"}
								type={"subtitle"}
							/>
						</div>
						<div className="user-email info-div">
							<Text
								content={"Email:"}
								type={"subtitle"}
							/>
							<Text
								content={"sampleemail@gmail.com"}
								type={"subtitle"}
							/>
						</div>
						<div className="user-address info-div">
							<Text
								content={"Address:"}
								type={"subtitle"}
							/>
							<Text
								content={"Disctrict 1, Ho Chi Minh City"}
								type={"subtitle"}
							/>
						</div>
						<div className="user-phone info-div">
							<Text
								content={"Phone Number:"}
								type={"subtitle"}
							/>
							<Text
								content={"0938555758"}
								type={"subtitle"}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyAccount;
