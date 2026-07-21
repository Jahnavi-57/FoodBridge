const pool = require("../config/database");

const getUserById = async (id) => {

    const result = await pool.query(

        `
        SELECT
            id,
            full_name,
            role
        FROM "Users"
        WHERE id=$1
        `,

        [
            id
        ]

    );

    return result.rows[0];

};

const getUserProfile = async (userId) => {

    const result = await pool.query(

        `SELECT

            id,

            full_name,

            email,

            phone,

            role,

            org_name,

            address,

            latitude,

            longitude,

            notification_enabled,

            is_verified,

            created_at

        FROM "Users"

        WHERE id = $1`,

        [

            userId

        ]

    );

    return result.rows[0];

};



const updateUserProfile = async (userId, user) => {

    const result = await pool.query(

        `UPDATE "Users"

        SET

            full_name = $1,

            phone = $2,

            org_name = $3,

            address = $4,

            latitude = $5,

            longitude = $6,

            updated_at = NOW()

        WHERE id = $7

        RETURNING

            id,

            full_name,

            email,

            phone,

            role,

            org_name,

            address,

            latitude,

            longitude,

            notification_enabled,

            is_verified,

            created_at`,

        [

            user.full_name,

            user.phone,

            user.org_name,

            user.address,

            user.latitude,

            user.longitude,

            userId

        ]

    );

    return result.rows[0];

};



module.exports = {

    getUserProfile,

    updateUserProfile,
    getUserById

};