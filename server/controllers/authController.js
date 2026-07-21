const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("../models/authModel");


const signup = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            phone,
            role,
            org_name,
            address,
            latitude,
            longitude
        } = req.body;

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered."
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            full_name,
            email,
            password_hash,
            phone,
            role,
            org_name,
            address,
            latitude,
            longitude
        });
        const { password_hash :hashedPassword, ...safeUser } = newUser;
        return res.status(201).json({
            message: "User registered successfully!",
            user: safeUser
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        const { password_hash: hashedPassword, ...safeUser } = user;

        return res.status(200).json({
            message: "Login successful!",
            token,
            user: safeUser
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = { signup, login };