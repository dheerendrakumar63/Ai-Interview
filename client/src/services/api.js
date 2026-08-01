import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-interview-backend-puxa.onrender.com/api",
});

export default API;