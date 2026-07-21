import axios from "axios";


const API_URL = "https://foodbridge-backend-npfa.onrender.com/api/auth";


export const signupUser = async (userData) => {

    const response = await axios.post(

        `${API_URL}/signup`,

        userData

    );

    return response.data;

};



// Login API

export const loginUser = async (loginData) => {

    const response = await axios.post(

        `${API_URL}/login`,

        loginData

    );

    return response.data;

};