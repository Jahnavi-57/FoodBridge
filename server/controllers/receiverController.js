const {
    updateReceiverLocation, 
    getReceiverProfile,

    updateReceiverProfile,

    getReceiverStatistics
} = require("../models/receiverModel");

const updateLocationController = async (req, res) => {

    try {

        const {

            latitude,

            longitude

        } = req.body;

        if (

            latitude === undefined ||

            longitude === undefined

        ) {

            return res.status(400).json({

                message: "Latitude and longitude are required."

            });

        }

        const receiver = await updateReceiverLocation(

            req.user.id,

            latitude,

            longitude

        );

        return res.status(200).json({

            message: "Location updated successfully.",

            receiver

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

const getProfileController = async (req, res) => {

    try {

        const user = await getReceiverProfile(

            req.user.id

        );

        return res.status(200).json({

            user

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};


const updateProfileController = async (req, res) => {

    try {

        const updatedUser = await updateReceiverProfile(

            req.user.id,

            req.body

        );

        return res.status(200).json({

            message: "Profile updated successfully.",

            user: updatedUser

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};


const getStatisticsController = async (req, res) => {

    try {

        const statistics = await getReceiverStatistics(

            req.user.id

        );

        return res.status(200).json({

            statistics

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

module.exports = {

    updateLocationController,
    
    getProfileController,

    updateProfileController,

    getStatisticsController

};