import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function LoadingComponent({ isLoading }) {
	return (
		<>
			{isLoading && (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={isLoading}
				>
					<div className="flex flex-col justify-center items-center gap-2">
						<CircularProgress color="inherit" />
						<h1>Waiting</h1>
					</div>
				</Backdrop>
			)}
		</>
	);
}

export default LoadingComponent;
