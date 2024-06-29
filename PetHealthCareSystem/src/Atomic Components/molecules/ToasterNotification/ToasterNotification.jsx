import React from "react";
import "./ToasterNotification.scss";
import Text from "../../atoms/Text/Text";
import {
	ErrorIcon,
	InfoIcon,
	SuccessIcon,
	WarningIcon,
} from "../../../assets/Icon/Icon";
import toast from "react-hot-toast";

function Toast({ type, title, message }) {
	type = type || "info";
	message = message || "This is a default message";
	title = title || "";

	const customMessage = () => {
		return toast.custom(
			(t) => (
				<div
					className={`toast-content-container ${
						t.visible ? "animate-enter" : "animate-leave"
					} ${type}`}
					onClick={() => toast.dismiss(t.id)}
				>
					<div className="header-line" />
					{type.toLowerCase() === "success" && <SuccessIcon />}
					{type.toLowerCase() === "error" && <ErrorIcon />}
					{type.toLowerCase() === "warning" && <WarningIcon />}
					{type.toLowerCase() === "info" && <InfoIcon />}
					<div className="toast-text-container">
						<Text
							content={title}
							type={"h5"}
							className={"toast-title"}
							cursor={"pointer"}
						/>
						<Text
							content={message}
							type={"subtitle"}
							className={"toast-content"}
							cursor={"pointer"}
						/>
					</div>
				</div>
			),
			{
				duration: 2500,
			}
		);
	};

	const showToast = () => {
		return customMessage();
	};

	return showToast();
}

export default Toast;
