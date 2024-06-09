import React, { useEffect, useRef, useState } from "react";
import "./Modal.scss";
import Button from "../../atoms/Button/Button";
import { CancelIcon } from "../../../assets/Icon/Icon";
import Text from "../../atoms/Text/Text";

const Modal = ({ children, className, show, onHide, size }) => {
	const modalRef = useRef();

	const handleClose = (event) => {
		if (
			(!modalRef.current.contains(event.target) &&
				event.target.classList.contains(".MuiPickersDay-root")) ||
			event.target.classList.contains("modal-container")
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
		<>
			<div
				className={`modal-container ${show ? "opened" : "close"}`}
				onClick={handleClose}
				onKeyDown={handleClose}
			>
				<div
					className={`modal ${className} ${
						show ? "modal-show" : "modal-closed"
					} ${size}`}
					ref={modalRef}
					onClick={handleClose}
				>
					{children}
				</div>
			</div>
		</>
	);
};

const ModalHeader = ({ content, className }) => {
	return (
		<>
			<div className={`modal-header ${className}`}>
				{content && (
					<Text
						content={content}
						type={"h4"}
						className="modal-title"
					/>
				)}
				<Button
					className="cancel-mark bg-transparent border-0"
					variant={"icon-no-layout"}
					onlyIcon={<CancelIcon color={"#2d759f"} />}
					type={"button"}
				/>
			</div>
		</>
	);
};

const ModalBody = ({ children, className }) => {
	return (
		<>
			<div className={`modal-body ${className}`}>{children}</div>
		</>
	);
};

const ModalFooter = ({ children, className }) => {
	return (
		<>
			<div className={`modal-footer ${className}`}>{children}</div>
		</>
	);
};

Modal.defaultProps = {
	size: "auto",
};

ModalHeader.defaultProps = {
	icon: <CancelIcon />,
};

export { Modal, ModalHeader, ModalBody, ModalFooter };
