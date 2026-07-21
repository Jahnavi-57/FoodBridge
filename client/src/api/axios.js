import axios from "axios";

const api = axios.create({

    baseURL: "https://foodbridge-backend-npfa.onrender.com/api",

    headers: {

        "Content-Type": "application/json"

    }

});

export default api;