import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

const StyledTooltip = styled(({ className, ...props }) => (
	<Tooltip
		{...props}
		classes={{ popper: className }}
	/>
))`
  & .MuiTooltip-tooltip {
    background: #333333; /* Change the background color here */);
    padding: 16px;
	max-width: 250px;
    font-size: 12px; /* Adjust the font size here */
    color: white;
    letter-spacing: 0.75px;
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.5);
  }
  & .MuiTooltip-arrow::before {
    background: #333333;
  }
`;

export default function CustomTooltip({
	children,
	placement,
	arrow,
	followCursor,
	title,
	...rest
}) {
	return (
		<div
			data-testid="tooltip-test"
			{...rest}
		>
			<StyledTooltip
				title={title}
				placement={placement}
				arrow={arrow}
				followCursor={followCursor}
			>
				{children}
			</StyledTooltip>
		</div>
	);
}

CustomTooltip.defaultProps = {
	placement: "left",
	arrow: true,
	followCursor: false,
};
