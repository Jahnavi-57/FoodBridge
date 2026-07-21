const pool = require("../config/database");

const createNotification = async (notification) => {

    await pool.query(

        `INSERT INTO "Notifications"
        (
            user_id,
            donation_id,
            request_id,
            title,
            message,
            type
        )

        VALUES ($1,$2,$3,$4,$5,$6)`,

        [

            notification.user_id,
            notification.donation_id,
            notification.request_id,
            notification.title,
            notification.message,
            notification.type

        ]

    );

};

const getNotificationsByUser = async (userId) => {

    const result = await pool.query(

            `
            SELECT

                n.id,
                n.request_id,
                n.title,
                n.message,
                n.type,
                n.is_read,
                n.created_at,

                d.id AS donation_id,
                d.food_name,
                d.description,
                d.quantity,
                d.unit,
                d.status AS donation_status,
                d.expiry_time,

                r.status AS request_status

            FROM "Notifications" n

            LEFT JOIN "Donations" d

            ON d.id = n.donation_id


            LEFT JOIN "Requests" r

            ON r.id = n.request_id


            WHERE n.user_id=$1

            ORDER BY n.created_at DESC

            `,

            [userId]

            );

    return result.rows;

};

const getUnreadCount = async (userId) => {

    const result = await pool.query(

        `SELECT COUNT(*) AS count

        FROM "Notifications"

        WHERE

            user_id=$1

        AND

            is_read=FALSE`,

        [userId]

    );

    return Number(result.rows[0].count);

};

const markNotificationAsRead = async (id,userId) => {

    await pool.query(

        `UPDATE "Notifications"

        SET is_read=TRUE

        WHERE

            id=$1

        AND

            user_id=$2`,

        [

            id,
            userId

        ]

    );

};

const markAllNotificationsAsRead = async (userId) => {

    await pool.query(

        `UPDATE "Notifications"

        SET is_read=TRUE

        WHERE

            user_id=$1

        AND

            is_read=FALSE`,

        [

            userId

        ]

    );

};

module.exports = {

    createNotification,

    getNotificationsByUser,

    getUnreadCount,

    markNotificationAsRead,

    markAllNotificationsAsRead

};