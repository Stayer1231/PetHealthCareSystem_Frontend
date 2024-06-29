import React, { useEffect, useRef } from "react";
import "./ConfirmBox.scss";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { CancelIcon } from "../../../assets/Icon/Icon";

function ConfirmBox({ children, className, show, onHide, onCancel, onConfirm}) {
	const modalRef = useRef();

	const handleClose = (event) => {
		if (
			(!modalRef.current.contains(event.target) &&
				event.target.classList.contains(".MuiPickersDay-root")) ||
			event.target.classList.contains("confirm-box-container")
		) {
			onHide();
		}

		// Check if the clicked element or its parent contains the 'cancel-mark' class
		if (
			event.target.classList.contains("cancel-mark") ||
			event.target.closest(".cancel-mark")
		) {
			onHide(); // Call onHide when the cancel button or its parent is clicked
		}
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onHide(); // Call onHide when the escape key is pressed
			}
		};

		if (show) {
			document.body.style.overflow = "hidden";
			// Scroll to top when modal is opened

			document.body.addEventListener("keydown", handleKeyDown);
		} else {
			document.body.style.overflow = "auto";
			document.body.removeEventListener("keydown", handleKeyDown); // Cleanup event listener
		}

		return () => {
			document.body.style.overflow = "auto";
			document.body.removeEventListener("keydown", handleKeyDown); // Cleanup event listener
		};
	}, [show, onHide]);

	return (
		<div
			className={`confirm-box-container ${show ? "opened" : "close"}`}
			onClick={handleClose}
			ref={modalRef}
			onKeyDown={handleClose}
		>
			<div className="confirm-box-appearance">
				<div className={`confirm-box-header ${className}`}>
					<Text
						content={"Xác nhận"}
						type={"h6"}
						className="confirm-box-title"
					/>
					<Button
						className="cancel-mark bg-transparent border-0"
						variant={"icon-no-layout"}
						onlyIcon={<CancelIcon color={"#2d759f"} />}
						type={"button"}
					/>
				</div>

				<div className={`confirm-box-body ${className}`}>
					<div className="confirm-box-content">{children}</div>
				</div>

				<div className="btn-action-container">
					<Button
						content="Xác nhận"
						variant="filled"
						onClick={onConfirm}
					/>
					<Button
						content="Huỷ"
						variant="transparent"
						onClick={onCancel}
					/>
				</div>
			</div>
		</div>
	);
}

export default ConfirmBox;
