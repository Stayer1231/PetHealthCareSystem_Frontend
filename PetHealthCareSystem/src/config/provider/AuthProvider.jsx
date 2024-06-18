import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	useEffect(() => {
		const role = Cookies.get("role");
		if (role) {
			setAuth({ role });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
