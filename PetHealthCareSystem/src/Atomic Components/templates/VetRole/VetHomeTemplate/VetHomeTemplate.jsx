import React, { useEffect } from "react";
import Toast from "../../../molecules/ToasterNotification/ToasterNotification";

function VetHomeTemplate() {
	useEffect(() => {
		const successMessage = sessionStorage.getItem("successMessage");
		if (successMessage) {
			Toast({
				message: successMessage,
				type: "success",
				title: "Thành công",
			});
			sessionStorage.removeItem("successMessage");
		}
	}, []);

	return <div>VetHomeTemplate</div>;
}

export default VetHomeTemplate;
