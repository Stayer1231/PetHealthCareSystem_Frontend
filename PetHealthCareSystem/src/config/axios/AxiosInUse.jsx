import axios from "axios";

const config = {
    baseURL: "https://localhost:7189/api/",
}

const APIInUse = axios.create(config);

export default APIInUse;