const { body } = require("express-validator");

const donationValidation = [

    body("food_name")
        .trim()
        .notEmpty()
        .withMessage("Food name is required."),

    body("description")
        .optional()
        .trim(),

    body("food_type")
        .isIn(["VEG", "NON_VEG", "VEGAN", "JAIN", "DAIRY PRODUCTS"])
        .withMessage("Invalid food type."),

    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than 0."),

    body("unit")
        .isIn(["PLATES", "KG", "PACKETS","LITRES"])
        .withMessage("Invalid unit."),

    body("prepared_at")
        .isISO8601()
        .withMessage("Invalid preparation time."),

    body("expiry_time")
        .isISO8601()
        .withMessage("Invalid expiry time."),

    body("pickup_address")
        .trim()
        .notEmpty()
        .withMessage("Pickup address is required."),

    body("latitude")
        .isFloat({ min: -90, max: 90 }),

    body("longitude")
        .isFloat({ min: -180, max: 180 }),

    body("notification_radius_km")
        .optional()
        .isInt({ min: 1, max: 50 })

];

module.exports = {
    donationValidation
};