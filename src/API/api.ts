import axios from "axios";

const api = axios.create({
    //baseURL: "http://localhost:8080/"
    baseURL: "https://eihabitat.site/api/"
})

export {api}