import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/"
})

const botApi = axios.create({
    baseURL: "http://localhost:5000/chat"
})

export {api, botApi}