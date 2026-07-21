const {

    getUserProfile,

    updateUserProfile

} = require("../models/userModel");



const getUserProfileController = async (req, res) => {

    try {

        const user = await getUserProfile(req.user.id);

        if (!user) {

            return res.status(404).json({

                message: "User not found."

            });

        }

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





const updateUserProfileController = async (req, res) => {

    try {

        const updatedUser = await updateUserProfile(

            req.user.id,

            {

                full_name: req.body.full_name,

                phone: req.body.phone,

                org_name: req.body.org_name,

                address: req.body.address,

                latitude: req.body.latitude,

                longitude: req.body.longitude

            }

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



module.exports = {

    getUserProfileController,

    updateUserProfileController

};