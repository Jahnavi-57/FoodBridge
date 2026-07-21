const pool = require("../config/database");

const getUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM "Users" WHERE email = $1',
        [email]
    );

    return result.rows[0];
};

const createUser = async (userData) => {

    const {
        full_name,
        email,
        password_hash,
        phone,
        role,
        org_name,
        address,
        latitude,
        longitude
    } = userData;

    const result = await pool.query(
        `INSERT INTO "Users"
        (full_name,email,password_hash,phone,role,org_name,address,latitude,longitude)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *`,
        [
            full_name,
            email,
            password_hash,
            phone,
            role,
            org_name,
            address,
            latitude,
            longitude
        ]
    );

    return result.rows[0];
};

module.exports = {
    getUserByEmail,
    createUser
};