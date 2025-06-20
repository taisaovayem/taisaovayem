import axios from "axios";

export const api = axios.create({
    baseURL: process?.env?.API ?? "https://admin.taisaovayem.com/wp-json/wp/v2",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})