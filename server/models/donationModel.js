const pool = require("../config/database");


const updateExpiredDonations = async () => {

    const result = await pool.query(

        `UPDATE "Donations"

         SET

            status='EXPIRED',

            updated_at=NOW()

         WHERE

            status='AVAILABLE'

         AND

            expiry_time < NOW()

         RETURNING id`

    );

};

const createDonation = async (donation) => {

    const query = `

        INSERT INTO "Donations"
        (
            donor_id,
            food_name,
            description,
            food_type,
            quantity,
            unit,
            prepared_at,
            expiry_time,
            pickup_address,
            latitude,
            longitude,
            notification_radius_km
        )

        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
        )

        RETURNING *;

    `;

    const values = [

        donation.donor_id,
        donation.food_name,
        donation.description,
        donation.food_type,
        donation.quantity,
        donation.unit,
        donation.prepared_at,
        donation.expiry_time,
        donation.pickup_address,
        donation.latitude,
        donation.longitude,
        donation.notification_radius_km

    ];

    const result = await pool.query(query, values);

    return result.rows[0];

};

const getDonationById = async (id) => {

    const result = await pool.query(

        `SELECT * FROM "Donations" WHERE id=$1`,

        [id]

    );

    return result.rows[0];

};
const getAvailableDonations = async (receiverId) => {

    await updateExpiredDonations();

    const result = await pool.query(

        `

        SELECT

            d.*,

            r.id AS request_id,

            r.status AS request_status

        FROM "Donations" d

        LEFT JOIN "Requests" r

            ON d.id = r.donation_id

            AND r.receiver_id = $1

        WHERE d.status='AVAILABLE'

        ORDER BY d.created_at DESC

        `,

        [

            receiverId

        ]

    );

    return result.rows;

};

const acceptDonation = async (id, receiverId) => {

    const result = await pool.query(

        `UPDATE "Donations"

         SET

            receiver_id=$1,

            status='CLAIMED',

            updated_at=NOW()

         WHERE id=$2

         RETURNING *`,

        [

            receiverId,

            id

        ]

    );

    return result.rows[0];

};

const getMyDonations = async (donorId) => {

    await updateExpiredDonations();

    const result = await pool.query(

        `SELECT *

         FROM "Donations"

         WHERE donor_id=$1

         ORDER BY created_at DESC`,

        [donorId]

    );

    return result.rows;

};

const cancelDonation = async (id) => {

    const result = await pool.query(

        `UPDATE "Donations"

         SET

            status='CANCELLED',

            updated_at=NOW()

         WHERE id=$1

         RETURNING *`,

        [

            id

        ]

    );

    return result.rows[0];

};

const updateDonation = async (id, donation) => {

    const result = await pool.query(

        `UPDATE "Donations"

        SET

            food_name=$1,

            description=$2,

            food_type=$3,

            quantity=$4,

            unit=$5,

            prepared_at=$6,

            expiry_time=$7,

            pickup_address=$8,

            latitude=$9,

            longitude=$10,

            notification_radius_km=$11,

            updated_at=NOW()

        WHERE id=$12

        RETURNING *`,

        [

            donation.food_name,
            donation.description,
            donation.food_type,
            donation.quantity,
            donation.unit,
            donation.prepared_at,
            donation.expiry_time,
            donation.pickup_address,
            donation.latitude,
            donation.longitude,
            donation.notification_radius_km,
            id

        ]

    );

    return result.rows[0];

};

/* ---------- NEW ---------- */

const getDashboardStatistics = async (donorId) => {

    await updateExpiredDonations();
    const result = await pool.query(

        `

        SELECT

            COUNT(*) FILTER (WHERE status='AVAILABLE') AS active,

            COUNT(*) FILTER (WHERE status='COLLECTED') AS collected,

            COUNT(*) FILTER (WHERE status='CANCELLED') AS cancelled,

            COUNT(*) FILTER (WHERE status='EXPIRED') AS expired

        FROM "Donations"

        WHERE donor_id=$1

        `,

        [

            donorId

        ]

    );

    return result.rows[0];

};

const getRecentActivity = async (donorId) => {
    await updateExpiredDonations();
    const result = await pool.query(

        `

        SELECT

            id,

            food_name,

            status,

            updated_at

        FROM "Donations"

        WHERE donor_id=$1

        ORDER BY updated_at DESC

        LIMIT 5

        `,

        [

            donorId

        ]

    );

    return result.rows;

};

module.exports = {

    createDonation,

    getDonationById,

    getAvailableDonations,

    acceptDonation,

    getMyDonations,

    cancelDonation,

    updateDonation,

    getDashboardStatistics,

    getRecentActivity,

    updateExpiredDonations

};