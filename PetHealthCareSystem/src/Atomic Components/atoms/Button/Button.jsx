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
}) {
	return (
		<>
			{rightIcon ? (
				<button
					className={`btn-comp ${variant} ${className} right-icon ${
						stroke ? "stroke-enable" : "stroke-disable"
					}`}
					onClick={onClick}
					style={{ borderColor: stroke }}
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
					className={`btn-comp ${variant} ${className}`}
					onClick={onClick}
				>
					<Text
						cursor={"pointer"}
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
	variant: PropTypes.oneOf(["transparent", "filled", "underline", "no-layout"])
		.isRequired,
	onClick: PropTypes.func,
	className: PropTypes.string,
	rightIcon: PropTypes.element,
	stroke: PropTypes.string,
};

export default Button;
