import axios from "axios";
import Cookies from "js-cookie";

const config = {
	baseURL: "http://localhost:5148/api/",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer " + Cookies.get("accessToken"),
	},
};
const APIInUse = axios.create(config);

export default APIInUse;
