const {
    createDonation,
    getDonationById,
    acceptDonation,
    getAvailableDonations,
    getMyDonations,
    cancelDonation,
    updateDonation,
    getDashboardStatistics,
    getRecentActivity
} = require("../models/donationModel");

const { createNotification } = require("../models/notificationModel");
const { notifyNearbyReceivers } = require("../services/notificationService");
const { getReceiverById } = require("../models/receiverModel");
const { calculateDistance } = require("../utils/distanceCalculator");

const createDonationController = async (req, res) => {

    try {

        const donation = {

            donor_id: req.user.id,

            food_name: req.body.food_name,

            description: req.body.description,

            food_type: req.body.food_type,

            quantity: req.body.quantity,

            unit: req.body.unit,

            prepared_at: req.body.prepared_at,

            expiry_time: req.body.expiry_time,

            pickup_address: req.body.pickup_address,

            latitude: req.body.latitude,

            longitude: req.body.longitude,

            notification_radius_km:
                req.body.notification_radius_km || 5

        };

        const newDonation = await createDonation(donation);

        await notifyNearbyReceivers(newDonation);

        return res.status(201).json({

            message: "Donation posted successfully.",

            donation: newDonation

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

const getMyDonationsController = async (req, res) => {

    try {

        const donations = await getMyDonations(req.user.id);

        return res.status(200).json({

            donations

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

const updateDonationController = async (req, res) => {

    try {

        const donation = await getDonationById(req.params.id);

        if (!donation) {

            return res.status(404).json({

                message: "Donation not found."

            });

        }

        if (donation.donor_id !== req.user.id) {

            return res.status(403).json({

                message: "Unauthorized."

            });

        }

        if (donation.status !== "AVAILABLE") {

            return res.status(400).json({

                message: "Only available donations can be edited."

            });

        }

        const updatedDonation = await updateDonation(

            req.params.id,

            req.body

        );

        return res.status(200).json({

            message: "Donation updated successfully.",

            donation: updatedDonation

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

const cancelDonationController = async (req, res) => {

    try {

        const donation = await getDonationById(req.params.id);

        if (!donation) {

            return res.status(404).json({

                message: "Donation not found."

            });

        }

        if (donation.donor_id !== req.user.id) {

            return res.status(403).json({

                message: "Unauthorized."

            });

        }

        if (donation.status !== "AVAILABLE") {

            return res.status(400).json({

                message: "Only available donations can be cancelled."

            });

        }

        const cancelledDonation = await cancelDonation(req.params.id);

        return res.status(200).json({

            message: "Donation cancelled successfully.",

            donation: cancelledDonation

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

const acceptDonationController = async (req, res) => {

    try {

        const donationId = req.params.id;

        const donation = await getDonationById(donationId);

        if (new Date(donation.expiry_time) < new Date()) {

                return res.status(400).json({

                    message: "This donation has expired."

                });

        }

        if (!donation) {

            return res.status(404).json({

                message: "Donation not found."

            });

        }

        if (donation.status !== "AVAILABLE") {

            return res.status(400).json({

                message: "Donation is no longer available."

            });

        }

        const updatedDonation = await acceptDonation(

            donationId,

            req.user.id

        );

        await createNotification({

            user_id: donation.donor_id,

            donation_id: donation.id,

            title: "Donation Accepted",

            message: "A receiver has accepted your donation.",

            type: "DONATION_ACCEPTED"

        });

        return res.status(200).json({

            message: "Donation accepted successfully.",

            donation: updatedDonation

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

const getAvailableDonationsController = async (req, res) => {

    try {

        const receiver = await getReceiverById(req.user.id);

        const donations = await getAvailableDonations(req.user.id);

        const nearbyDonations = donations.filter(donation => {

            const distance = calculateDistance(

                receiver.latitude,

                receiver.longitude,

                donation.latitude,

                donation.longitude

            );

            return distance <= donation.notification_radius_km;

        });

        return res.status(200).json({

            donations: nearbyDonations

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }


};

const getDashboardStatisticsController = async (req, res) => {

    try {

        const statistics = await getDashboardStatistics(

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

const getRecentActivityController = async (req, res) => {

    try {

        const activities = await getRecentActivity(

            req.user.id

        );

        return res.status(200).json({

            activities

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

    createDonationController,

    getMyDonationsController,

    updateDonationController,

    cancelDonationController,

    acceptDonationController,

    getAvailableDonationsController,

    acceptDonationController,

    getAvailableDonationsController,

    getDashboardStatisticsController,

    getRecentActivityController

};