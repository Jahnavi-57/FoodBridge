import api from "./api";


export const requestDonation = async (donationId, message = "") => {

    const response = await api.post(

        `/requests/donations/${donationId}/request`,

        {
            message
        }

    );

    return response.data;

};



export const getMyRequests = async () => {

    const response = await api.get(

        "/requests/my"

    );

    return response.data;

};



export const markCollected = async (requestId) => {

    const response = await api.patch(

        `/requests/${requestId}/collect`

    );

    return response.data;

};


export const approveRequest = async (requestId) => {

    const response = await api.patch(

        `/requests/${requestId}/approve`

    );

    return response.data;

};



export const rejectRequest = async (requestId) => {

    const response = await api.patch(

        `/requests/${requestId}/reject`

    );

    return response.data;

};