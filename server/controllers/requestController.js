const {

    createRequest,
    getRequestByDonationAndReceiver,
    hasAcceptedRequest,
    getReceiverRequests,
    getDonationRequests,
    getRequestById,
    approveRequest,
    rejectRequest,
    completeRequest

} = require("../models/requestModel");

const {

    getDonationById

} = require("../models/donationModel");

const {

    createNotification

} = require("../models/notificationModel");

const {
    getUserById
} = require("../models/userModel");

const pool = require("../config/database");


/* -----------------------------------------
   Receiver requests a donation
------------------------------------------ */

const createRequestController = async (req, res) => {

    try {

        const donationId = req.params.id;

        const donation = await getDonationById(donationId);

        if (!donation) {

            return res.status(404).json({

                message: "Donation not found."

            });

        }

        if (

                donation.status === "CANCELLED" ||

                donation.status === "EXPIRED" ||

                donation.status === "CLAIMED" ||

                donation.status === "COLLECTED"

            ) {

                return res.status(400).json({

                    message: "This donation is no longer available."

                });

            }

            const alreadyAccepted = await hasAcceptedRequest(

                 donationId

            );

        if (alreadyAccepted) {

            return res.status(409).json({

                message: "This donation has already been claimed by another receiver."

            });

        }
        const alreadyRequested =
            await getRequestByDonationAndReceiver(

                donationId,

                req.user.id

            );

        if (alreadyRequested) {

            return res.status(400).json({

                message: "You have already requested this donation."

            });

        }

        const request = await createRequest({

            donation_id: donationId,

            receiver_id: req.user.id,

            message: req.body.message || ""

        });

       

        const receiver = await getUserById(
    req.user.id
);


await createNotification({

    user_id: donation.donor_id,

    donation_id: donation.id,

    request_id: request.id,

    title: "New Donation Request",

    message:
        `${receiver.full_name} requested your ${donation.food_name}.`,

    type: "REQUEST_RECEIVED"

});

        return res.status(201).json({

            message: "Donation requested successfully.",

            request

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};




const getMyRequestsController = async (req, res) => {

    try {

        const requests = await getReceiverRequests(

            req.user.id

        );

        return res.status(200).json({

            requests

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};




const getDonationRequestsController = async (req, res) => {

    try {

        const donation = await getDonationById(

            req.params.id

        );

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

        const requests = await getDonationRequests(

            req.params.id

        );

        return res.status(200).json({

            requests

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};




const approveRequestController = async (req, res) => {

    try {

        const request = await getRequestById(

            req.params.id

        );

        if (!request) {

            return res.status(404).json({

                message: "Request not found."

            });

        }

        const donation = await getDonationById(

            request.donation_id

        );

        if (donation.donor_id !== req.user.id) {

            return res.status(403).json({

                message: "Unauthorized."

            });

        }

        const approved = await approveRequest(

            request.id

        );

        const rejectedRequests = await pool.query(

            `
            SELECT *

            FROM "Requests"

            WHERE donation_id=$1

            AND id<>$2

            AND status='PENDING'

            `,

            [

                donation.id,

                request.id

            ]

        );



        await pool.query(

            `
            UPDATE "Requests"

            SET

                status='REJECTED',

                responded_at=NOW()

            WHERE donation_id=$1

            AND id<>$2

            AND status='PENDING'

            `,

            [

                donation.id,

                request.id

            ]

        );


        for (const rejected of rejectedRequests.rows) {

            await createNotification({

                user_id: rejected.receiver_id,

                donation_id: donation.id,

                request_id: rejected.id,

                title: "Request Rejected",

                message: `Your request for ${donation.food_name} was rejected because another receiver's request was accepted.`,

                type: "REQUEST_REJECTED"

            });

        }

        await pool.query(

                `
                UPDATE "Donations"
                SET
                    receiver_id=$1,
                    status='CLAIMED',
                    updated_at=NOW()
                WHERE id=$2
                `,

                [
                    request.receiver_id,
                    donation.id
                ]

                );

        await createNotification({

            user_id: request.receiver_id,

            donation_id: donation.id,

            title: "Request Accepted",

            message: "Your request has been accepted by the donor.",

            type: "REQUEST_ACCEPTED"

        });

        return res.status(200).json({

            message: "Request accepted successfully.",

            request: approved

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};




const rejectRequestController = async (req, res) => {

    try {

        const request = await getRequestById(

            req.params.id

        );

        if (!request) {

            return res.status(404).json({

                message: "Request not found."

            });

        }

        const donation = await getDonationById(

            request.donation_id

        );

        if (donation.donor_id !== req.user.id) {

            return res.status(403).json({

                message: "Unauthorized."

            });

        }

        const rejected = await rejectRequest(

            request.id

        );
                await createNotification({

            user_id: request.receiver_id,

            donation_id: donation.id,

            request_id: request.id,

            title: "Request Rejected",

            message:
            "Your request for this donation was rejected by the donor.",

            type: "REQUEST_REJECTED"

        });

            const pendingRequests = await pool.query(

                `

                SELECT COUNT(*)

                FROM "Requests"

                WHERE donation_id=$1

                AND status='PENDING'

                `,

                [

                    donation.id

                ]

            );

            if (

                Number(

                    pendingRequests.rows[0].count

                ) === 0

            ) {

                await pool.query(

                    `

                    UPDATE "Donations"

                    SET

                        status='AVAILABLE',

                        updated_at=NOW()

                    WHERE id=$1

                    `,

                    [

                        donation.id

                    ]

                );

            }

        return res.status(200).json({

            message: "Request rejected.",

            request: rejected

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

};



const completeRequestController = async (req, res) => {

    try {

        const request = await getRequestById(

            req.params.id

        );

        if (!request) {

            return res.status(404).json({

                message: "Request not found."

            });

        }

        if (request.receiver_id !== req.user.id) {

            return res.status(403).json({

                message: "Unauthorized."

            });

        }

        const completed = await completeRequest(

            request.id

        );
        const donation = await getDonationById(
        request.donation_id
    );

        const receiver = await getUserById(
        request.receiver_id
        );

        await createNotification({

                user_id: donation.donor_id,

                donation_id: request.donation_id,

                request_id: request.id,

                title: "Donation Collected",

                message: `${receiver.full_name} has collected your ${donation.food_name}.`,

                type: "DONATION_COLLECTED"

            });
        await pool.query(

            `

            UPDATE "Donations"

            SET

                status='COLLECTED',

                updated_at=NOW()

            WHERE id=$1

            `,

            [

                request.donation_id

            ]

        );

        return res.status(200).json({

            message: "Donation marked as collected.",

            request: completed

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

    createRequestController,

    getMyRequestsController,

    getDonationRequestsController,

    approveRequestController,

    rejectRequestController,

    completeRequestController

};