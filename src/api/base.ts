import axios from "axios";

export const api = axios.create({
    baseURL: process?.env?.API ?? "http://taisaovayem.com",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})