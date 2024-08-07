import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";
import Text from "../Text/Text";

function Button({
	content,
	variant,
	onClick,
	className,
	rightIcon,
	stroke,
	textColor,
	onlyIcon,
	disabled,
	type,
}) {
	return (
		<>
			{onlyIcon ? (
				<button
					className={`btn-comp ${variant} ${className} only-icon ${
						stroke ? "stroke-enable" : "stroke-disable"
					}`}
					onClick={onClick}
					style={{ borderColor: stroke }}
					type={type}
				>
					{onlyIcon}
				</button>
			) : rightIcon ? (
				<button
					className={`btn-comp ${variant} ${className} right-icon ${
						stroke ? "stroke-enable" : "stroke-disable"
					}`}
					onClick={onClick}
					style={{ borderColor: stroke }}
					type={type}
				>
					<Text
						cursor={"pointer"}
						content={content}
						type={"primary"}
						textColor={textColor}
					/>
					{rightIcon}
				</button>
			) : (
				<button
					className={`btn-comp ${variant} ${className} ${
						disabled ? "disabled-btn" : ""
					}`}
					onClick={onClick}
					disabled={disabled}
					type={type}
				>
					<Text
						cursor={`${disabled ? "not-allowed" : "pointer"}`}
						content={content}
						type={"subtitle"}
					/>
				</button>
			)}
		</>
	);
}

Button.propTypes = {
	content: PropTypes.string.isRequired,
	variant: PropTypes.oneOf([
		"transparent",
		"filled",
		"underline",
		"no-layout",
		"icon-no-layout",
	]).isRequired,
	onClick: PropTypes.func,
	className: PropTypes.string,
	rightIcon: PropTypes.element,
	stroke: PropTypes.string,
};

Button.defaultProps = {
	variant: "filled",
};

export default Button;
