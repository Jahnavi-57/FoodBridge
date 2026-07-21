import axios from "axios";

const API_URL = "https://foodbridge-backend-npfa.onrender.com/api/users";



const getAuthConfig = () => {

    const token = localStorage.getItem("token");

    return {

        headers: {

            Authorization: `Bearer ${token}`

        }

    };

};




export const getUserProfile = async () => {

    const response = await axios.get(

        `${API_URL}/profile`,

        getAuthConfig()

    );

    return response.data;

};




export const updateUserProfile = async (userData) => {

    const response = await axios.put(

        `${API_URL}/profile`,

        userData,

        getAuthConfig()

    );

    return response.data;

};