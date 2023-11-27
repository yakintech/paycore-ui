import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://localhost:7114/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    });