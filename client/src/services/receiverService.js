import api from "./api";

export const getReceiverProfile = async () => {

    const response = await api.get(

        "/receivers/profile"

    );

    return response.data;

};

export const updateReceiverProfile = async (data) => {

    const response = await api.patch(

        "/receivers/profile",

        data

    );

    return response.data;

};

export const getReceiverStatistics = async () => {

    const response = await api.get(

        "/receivers/statistics"

    );

    return response.data;

};