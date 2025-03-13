import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/"
    //baseURL: "http://14.225.253.213:8080/"
})

export {api}