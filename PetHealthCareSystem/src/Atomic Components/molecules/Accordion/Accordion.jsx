import React, { useRef, useState, useEffect } from "react";
import "./Accordion.scss";
import { LeftArrowBracket } from "../../../assets/Icon/Icon";
import Text from "../../atoms/Text/Text";
import { useLocation } from "react-router-dom";

// ACCORDION MAIN
const Accordion = ({ children, className }) => {
	return <div className={`accordion-container ${className}`}>{children}</div>;
};

// // ACCORDION ITEM
const AccordionItem = ({ title, children }) => {
	const location = useLocation();
	const [active, setActive] = useState(false);

	// HANDLE ACCORDION CLICKED
	const handleAccordionClicked = () => {
		setActive(!active);
	};

	// === USEEFFCT SCOPE ===
	// RESET ACCORDION WHEN LOCATION CHANGES
	useEffect(() => {
		setActive(false);
	}, [location.pathname]);

	return (
		<div className="accordion-item">
			<AccordionHeader
				onClick={handleAccordionClicked}
				title={title}
				active={active}
			/>
			<AccordionBody active={active}>{children}</AccordionBody>
		</div>
	);
};

// ACCORDION HEADER
const AccordionHeader = ({ onClick, children, title, active }) => {
	return (
		<div
			className="accordion-header"
			onClick={onClick}
		>
			{children ? (
				children
			) : (
				<Text
					content={title}
					type={"subtitle"}
				/>
			)}
			<div className={`icon-container ${active ? "isShown" : "isClosed"}`}>
				<LeftArrowBracket />
			</div>
		</div>
	);
};

// ACCORDION BODY
const AccordionBody = ({ children, active }) => {
	const [maxHeight, setMaxHeight] = useState(0);
	const bodyRef = useRef(null);

	useEffect(() => {
		if (bodyRef.current) {
			setMaxHeight(active ? bodyRef.current.scrollHeight : 0);
		}
	}, [active]);

	return (
		<div
			ref={bodyRef}
			className={`accordion-body ${active ? "open" : "closed"}`}
			style={{ maxHeight: `${maxHeight}px` }}
		>
			{children}
		</div>
	);
};

export { Accordion, AccordionHeader, AccordionBody, AccordionItem };
