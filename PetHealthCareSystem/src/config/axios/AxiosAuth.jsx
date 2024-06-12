import axios from "axios";

const config = {
    baseURL: "https://localhost:7189/api/Auth/",
    header: {
        "Content-Type": "application/json",
    }
}

const AuthAPI = axios.create(config);

export default AuthAPI;