import axios, { AxiosRequestConfig } from "axios";

const defaultOptions = {
    baseURL: "http://localhost:3002",
    headers: {
        "Content-type": "application/json",
    },
};

export const http = axios.create(defaultOptions);
http.interceptors.request.use( (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    config.headers = { Authorization: token ? token : "" };

    return config;
});
