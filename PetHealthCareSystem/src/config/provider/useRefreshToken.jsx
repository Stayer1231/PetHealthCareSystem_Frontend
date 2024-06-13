import AuthAPI from "../axios/AxiosAuth";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useRefreshToken = () => {
	const { setAuth } = useAuth();
	const fullName = Cookies.get("fullName");
	const userName = Cookies.get("username");
	const refToken = Cookies.get("refToken");
	const role = Cookies.get("role");

	const refresh = async () => {
		const response = await AuthAPI.post(`refresh-token`, {
			token: refToken,
		});

		setAuth((prevAuth) => {
			return {
				...prevAuth,
				fullName: fullName,
				userName: userName,
				refToken: refToken,
				role: role,
				accessToken: response.data.data.token,
			};
		});

		Cookies.set("accessToken", response.data.data.token);

		return response.data.data.token;
	};

	return refresh;
};

export default useRefreshToken;
