import React from "react";
import "./PatientDetailForm.scss";
import Text from "../../../atoms/Text/Text";
import LogoImg from "../../../../assets/img/dog_logo.jpg";
import DogImg from "../../../../assets/img/Dog.jpg";

function PatientDetailForm() {
	return (
		<>
			<div className="patient-detail-form-container">
				<div className="form-container">
					{/* FORM HEADER CONTAINER */}
					<div className="form-header-container">
						{/* HEADER MAIN PART */}
						<div className="header-main">
							<div className="header-content">
								{/* LEFT PART */}
								<div className="header-left">
									<Text
										content={"Pet Health Record"}
										type={"h3"}
										className={"title-content"}
									/>
									<Text
										content={"Peticare"}
										type={"subtitle"}
										className={"subtitle-content"}
									/>
								</div>

								{/* RIGHT PART */}
								<div className="header-right">
									<div className="img-container">
										<img src={LogoImg} />
									</div>
								</div>
							</div>
						</div>

						{/* HEADER DECORATION PART */}
						<div className="header-sub">
							<div className="color-1" />
							<div className="color-2" />
						</div>
					</div>

					{/* FORM BODY CONTAINER */}
					<div className="form-body-container">
						{/* PET INFORMATION BLOCK */}
						<div className="pet-information information-block">
							<HeaderDiv title={"Pet Information"} />

							{/* PET INFORMATION BODY */}
							<div className="information-body">
								{/* IMG CONTAINER */}
								<div className="img-container">
									<img
										src={DogImg}
										alt="Pet Image"
									/>
								</div>

								{/* INFOR CONTAINER */}
								<div className="info-container">
									{/* NAME */}
									<div className="pet-name information-div">
										<Text
											content={"Name: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"Kakashi"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* SPECIES */}
									<div className="pet-breed information-div">
										<Text
											content={"Species: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={" Dog"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* BREED */}
									<div className="pet-breed information-div">
										<Text
											content={"Breed: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"Ninja"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* DATE OF BIRTH */}
									<div className="pet-dob information-div">
										<Text
											content={"Date of Birth: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"21/09/2003"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* OWNER INFORMATION BLOCK */}
						<div className="owner-info-container information-block">
							<HeaderDiv title={"Owner Information"} />
							<div className="information-body">
								{/* INFO CONTAINER */}
								<div className="info-container">
									{/* OWNER NAME */}
									<div className="owner-name information-div">
										<Text
											content={"Name: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"Kakashi Hatake"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* OWNER PHONE NUMBER */}
									<div className="owner-phone information-div">
										<Text
											content={"Phone: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"0938555758"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>

									{/* OWNER EMAIL */}
									<div className="owner-email information-div">
										<Text
											content={"Email: "}
											type={"subtitle"}
											className={"text-label"}
										/>
										<Text
											content={"nthanhphong941@gmail.com"}
											type={"subtitle"}
											className={"text-content"}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PatientDetailForm;

export const HeaderDiv = ({ title }) => {
	return (
		<>
			<div className="header-div">
				<div className="header-title">
					<Text
						content={title}
						type={"h4"}
						className={"title-content"}
					/>
				</div>
			</div>
			<div className="sub-header-div"></div>
		</>
	);
};
