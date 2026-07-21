const pool = require("../config/database");

const getEligibleReceivers = async () => {

    const result = await pool.query(

        `SELECT
            id,
            full_name,
            latitude,
            longitude

        FROM "Users"

        WHERE role = 'RECEIVER'
        AND is_verified = TRUE
        AND notification_enabled = TRUE`

    );

    return result.rows;

};

const getReceiverById = async (receiverId) => {

    const result = await pool.query(

        `SELECT
            id,
            latitude,
            longitude

        FROM "Users"

        WHERE id = $1`,

        [receiverId]

    );

    return result.rows[0];

};
const updateReceiverLocation = async (

    receiverId,

    latitude,

    longitude

) => {

    const result = await pool.query(

        `

        UPDATE "Users"

        SET

            latitude=$1,

            longitude=$2

        WHERE id=$3

        RETURNING id, latitude, longitude

        `,

        [

            latitude,

            longitude,

            receiverId

        ]

    );

    return result.rows[0];

};

const getReceiverProfile = async (receiverId) => {

    const result = await pool.query(

        `

        SELECT

            id,

            full_name,

            email,

            phone,

            org_name,

            address,

            latitude,

            longitude,

            role,

            is_verified,

            notification_enabled,

            created_at

        FROM "Users"

        WHERE id=$1

        `,

        [

            receiverId

        ]

    );

    return result.rows[0];

};


const updateReceiverProfile = async (

    receiverId,

    profile

) => {

    const result = await pool.query(

        `

        UPDATE "Users"

        SET

            full_name=$1,

            phone=$2,

            org_name=$3,

            address=$4,

            latitude=$5,

            longitude=$6

        WHERE id=$7

        RETURNING *

        `,

        [

            profile.full_name,

            profile.phone,

            profile.org_name,

            profile.address,

            profile.latitude,

            profile.longitude,

            receiverId

        ]

    );

    return result.rows[0];

};


const getReceiverStatistics = async (

    receiverId

) => {

    const result = await pool.query(

        `

        SELECT

            COUNT(*) AS requested,

            COUNT(*) FILTER (WHERE status IN ('ACCEPTED', 'COMPLETED')) AS accepted,

            COUNT(*) FILTER (WHERE status='COMPLETED') AS collected,

            COUNT(*) FILTER (WHERE status='REJECTED') AS rejected

        FROM "Requests"

        WHERE receiver_id=$1

        `,

        [

            receiverId

        ]

    );

    return result.rows[0];

};
module.exports = {
    getEligibleReceivers,
    getReceiverById,
    updateReceiverLocation,
    getReceiverProfile,
    updateReceiverProfile,
    getReceiverStatistics

};
