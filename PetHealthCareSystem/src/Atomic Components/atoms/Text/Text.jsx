import React from "react";
import PropTypes from "prop-types";
import "./Text.scss";

function Text({ type, className, content, htmlFor, cursor, textColor, onClick }) {
	const combinedClassName = `${className} ${type}`;
	return (
		<>
			<label
				htmlFor={htmlFor || ""}
				className={combinedClassName}
				style={{ cursor: cursor || "default", color: textColor || "" }}
				onClick={onClick}
			>
				{content}
			</label>
		</>
	);
}

Text.propTypes = {
	type: PropTypes.string,
	className: PropTypes.string,
	content: PropTypes.string,
	htmlFor: PropTypes.string,
};

Text.defaultProps = {
	type: "subtitle",
};

export default Text;
