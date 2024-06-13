export const RightArrowBracket = ({ props, color }) => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g
			id="SVGRepo_bgCarrier"
			stroke-width="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<path
				d="M10 7L15 12L10 17"
				stroke={color ? color : "#2d759f"}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>{" "}
		</g>
	</svg>
);

export const LeftArrowBracket = ({ props, className }) => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		transform="rotate(180)"
		className={className}
	>
		<g
			id="SVGRepo_bgCarrier"
			stroke-width="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<path
				d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
				fill="#2d759f"
			></path>{" "}
		</g>
	</svg>
);

export const UpdatePencil = ({ props, color }) => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
	>
		<g
			id="SVGRepo_bgCarrier"
			stroke-width="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			<path
				d="M4.003 21c.081 0 .162-.01.242-.03l4-1c.176-.044.337-.135.465-.263L21.003 7.414c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414L19.417 3c-.756-.756-2.072-.756-2.828 0L4.296 15.293a1.003 1.003 0 0 0-.263.464l-1 4A1 1 0 0 0 4.003 21zm14-16.586L19.589 6l-1.586 1.586L16.417 6l1.586-1.586zM5.906 16.511l9.097-9.097L16.589 9l-9.098 9.097-2.114.528.529-2.114z"
				fill={color ? color : "#000000"}
			></path>
		</g>
	</svg>
);

export const CancelIcon = ({ props, color }) => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 512 512"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		fill="currentColor"
	>
		<g
			id="SVGRepo_bgCarrier"
			stroke-width="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<title>cancel</title>{" "}
			<g
				id="Page-1"
				stroke="none"
				stroke-width="1"
				fill="none"
				fill-rule="evenodd"
			>
				{" "}
				<g
					id="work-case"
					fill={color ? color : "#000000"}
					transform="translate(91.520000, 91.520000)"
					className="cancel-icon-root"
				>
					{" "}
					<polygon
						id="Close"
						points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
					>
						{" "}
					</polygon>{" "}
				</g>{" "}
			</g>{" "}
		</g>
	</svg>
);

export const AddIcon = ({ props, color }) => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g
			id="SVGRepo_bgCarrier"
			stroke-width="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="#2d759f"
				stroke-width="1.5"
			></circle>{" "}
			<path
				d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
				stroke="#2d759f"
				stroke-width="1.5"
				stroke-linecap="round"
			></path>{" "}
		</g>
	</svg>
);


export const DeleteIcon = ({ props, color }) => (
	<svg fill={color ? color : "#00000"} width="18px" height="18px" viewBox="-2.94 0 31.716 31.716" xmlns="http://www.w3.org/2000/svg">
		<g id="SVGRepo_bgCarrier" stroke-width="0">
		</g>
		<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
		</g>
		<g id="SVGRepo_iconCarrier">
			<g transform="translate(-355.957 -579)">
				<path d="M376.515,610.716H361.231a2.361,2.361,0,0,1-2.358-2.359V584.1a1,1,0,0,1,2,0v24.255a.36.36,0,0,0,.358.359h15.284a.36.36,0,0,0,.358-.359V584.1a1,1,0,0,1,2,0v24.255A2.361,2.361,0,0,1,376.515,610.716Z">
				</path>
				<path d="M365.457,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,365.457,604.917Z">
				</path>
				<path d="M372.29,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,372.29,604.917Z">
				</path>
				<path d="M380.79,585.1H356.957a1,1,0,0,1,0-2H380.79a1,1,0,0,1,0,2Z">
				</path>
				<path d="M372.79,581h-7.917a1,1,0,1,1,0-2h7.917a1,1,0,0,1,0,2Z">
				</path>
			</g>
		</g>
	</svg>
)