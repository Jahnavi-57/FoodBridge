const pool = require("../config/database");


const createRequest = async (request) => {

    const result = await pool.query(

        `

        INSERT INTO "Requests"
        (
            donation_id,
            receiver_id,
            message
        )

        VALUES
        (
            $1,
            $2,
            $3
        )

        RETURNING *

        `,

        [

            request.donation_id,

            request.receiver_id,

            request.message

        ]

    );

    return result.rows[0];

};

/* ----------------------------------
   Check if receiver already requested
----------------------------------- */

const getRequestByDonationAndReceiver = async (

    donationId,

    receiverId

) => {

    const result = await pool.query(

        `

        SELECT *

        FROM "Requests"

        WHERE donation_id=$1

        AND receiver_id=$2

        `,

        [

            donationId,

            receiverId

        ]

    );

    return result.rows[0];

};
const hasAcceptedRequest = async (

    donationId

) => {

    const result = await pool.query(

        `

        SELECT id

        FROM "Requests"

        WHERE donation_id=$1

        AND status='ACCEPTED'

        LIMIT 1

        `,

        [

            donationId

        ]

    );

    return result.rows.length > 0;

};

/* ------------------------------
   Get all requests of receiver
------------------------------- */

const getReceiverRequests = async (

    receiverId

) => {

    const result = await pool.query(

        `

        SELECT

            r.id,

            r.status,

            r.message,

            r.requested_at,

            r.responded_at,

            r.completed_at,

            d.id AS donation_id,

            d.food_name,

            d.description,

            d.food_type,

            d.quantity,

            d.unit,

            d.expiry_time,

            d.pickup_address,

            d.latitude,

            d.longitude,

            d.status AS donation_status,

            u.full_name AS donor_name,

            u.phone,

            u.org_name

        FROM "Requests" r

        INNER JOIN "Donations" d

            ON r.donation_id=d.id

        INNER JOIN "Users" u

            ON d.donor_id=u.id

        WHERE r.receiver_id=$1

        ORDER BY r.requested_at DESC

        `,

        [

            receiverId

        ]

    );

    return result.rows;

};

/* -----------------------------------
   Get all requests for one donation
------------------------------------ */

const getDonationRequests = async (

    donationId

) => {

    const result = await pool.query(

        `

        SELECT

            r.*,

            u.full_name,

            u.phone,

            u.org_name

        FROM "Requests" r

        INNER JOIN "Users" u

            ON r.receiver_id=u.id

        WHERE donation_id=$1

        ORDER BY requested_at ASC

        `,

        [

            donationId

        ]

    );

    return result.rows;

};

/* -----------------------------------
   Get request by id
------------------------------------ */

const getRequestById = async (

    requestId

) => {

    const result = await pool.query(

        `

        SELECT *

        FROM "Requests"

        WHERE id=$1

        `,

        [

            requestId

        ]

    );

    return result.rows[0];

};

/* -----------------------------------
   Approve request
------------------------------------ */

const approveRequest = async (

    requestId

) => {

    const result = await pool.query(

        `

        UPDATE "Requests"

        SET

            status='ACCEPTED',

            responded_at=NOW()

        WHERE id=$1

        RETURNING *

        `,

        [

            requestId

        ]

    );

    return result.rows[0];

};

/* -----------------------------------
   Reject request
------------------------------------ */

const rejectRequest = async (

    requestId

) => {

    const result = await pool.query(

        `

        UPDATE "Requests"

        SET

            status='REJECTED',

            responded_at=NOW()

        WHERE id=$1

        RETURNING *

        `,

        [

            requestId

        ]

    );

    return result.rows[0];

};

/* -----------------------------------
   Mark collected
------------------------------------ */

const completeRequest = async (

    requestId

) => {

    const result = await pool.query(

        `

        UPDATE "Requests"

        SET

            status='COMPLETED',

            completed_at=NOW()

        WHERE id=$1

        RETURNING *

        `,

        [

            requestId

        ]

    );

    return result.rows[0];

};

module.exports = {

    createRequest,

    getRequestByDonationAndReceiver,

    hasAcceptedRequest,

    getReceiverRequests,

    getDonationRequests,

    getRequestById,

    approveRequest,

    rejectRequest,

    completeRequest

};