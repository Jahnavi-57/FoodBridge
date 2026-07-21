import api from "./api";


export const createDonation = async (donationData) => {

    const response = await api.post(

        "/donations",

        donationData

    );

    return response.data;

};


export const getMyDonations = async () => {

    const response = await api.get(

        "/donations/my"

    );

    return response.data;

};


export const updateDonation = async (

    id,

    donationData

) => {

    const response = await api.put(

        `/donations/${id}`,

        donationData

    );

    return response.data;

};


export const cancelDonation = async (id) => {

    const response = await api.patch(

        `/donations/${id}/cancel`

    );

    return response.data;

};


export const getDashboardStatistics = async () => {

    const response = await api.get(

        "/donations/dashboard"

    );

    return response.data;

};


export const getRecentActivity = async () => {

    const response = await api.get(

        "/donations/activity"

    );

    return response.data;

};

export const getAvailableDonations = async () => {

    const response = await api.get(

        "/donations"

    );

    return response.data;

};