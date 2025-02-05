import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.error(error.response);
        Promise.reject(error);
    }
)