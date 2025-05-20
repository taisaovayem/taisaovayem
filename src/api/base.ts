import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})