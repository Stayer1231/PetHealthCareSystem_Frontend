import axios from "axios";

const config = {
    baseURL: "http://localhost:5148/api/Auth/",
    header: {
        "Content-Type": "application/json",
    }
}

const AuthAPI = axios.create(config);

export default AuthAPI;