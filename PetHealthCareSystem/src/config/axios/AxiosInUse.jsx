import axios from "axios";
import Cookies from "js-cookie";

const APIInUse = axios.create({
	baseURL: "http://localhost:5148/api/",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer " + Cookies.get("accessToken"),
	},
});

APIInUse.interceptors.request.use(
	(config) => {
		const token = Cookies.get("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default APIInUse;
