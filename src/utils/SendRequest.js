import Axios from "axios";
import * as constants from "./constants";
const apiServerUrl = `${constants.config.PROTOCOL}${constants.config.URL}`;

const instance = () => {
    let token = localStorage.getItem("KR_Marketing_token");
    let requestHeaders = {
        'Content-Type': 'application/json',
    };

    if (token) requestHeaders.Authorization = `Bearer ${token}`;

    return Axios.create({
        baseURL: apiServerUrl,
        timeout: 5000,
        mode: 'cors',
        headers: requestHeaders,
        withCredentials: true,
    });
}

export default instance;