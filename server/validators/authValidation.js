const { body, validationResult } = require("express-validator");

const signupValidation = [

    body("full_name")
        .trim()
        .notEmpty()
        .withMessage("Full name is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Full name must be between 3 and 100 characters."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long."),

    body("phone")
        .matches(/^[0-9]{10}$/)
        .withMessage("Phone number must contain exactly 10 digits."),

    body("role")
        .isIn(["DONOR", "RECEIVER", "ADMIN"])
        .withMessage("Invalid role."),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required."),

    body("latitude")
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude must be between -90 and 90."),

    body("longitude")
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude must be between -180 and 180.")

];

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errors.array()

        });

    }

    next();

};

module.exports = {

    signupValidation,

    validate

};