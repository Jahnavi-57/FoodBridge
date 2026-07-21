const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const { allowRoles } = require("../middleware/roleMiddleware");

const { validate } = require("../middleware/validationMiddleware");

const { donationValidation } = require("../validators/donationValidation");

const {

    createDonationController,

    getMyDonationsController,

    updateDonationController,

    cancelDonationController,

    acceptDonationController,

    getAvailableDonationsController,

    getDashboardStatisticsController,

    getRecentActivityController

} = require("../controllers/donationController");

router.post(

    "/",

    verifyToken,

    allowRoles("DONOR"),

    donationValidation,

    validate,

    createDonationController

);

router.get(

    "/my",

    verifyToken,

    allowRoles("DONOR"),

    getMyDonationsController

);

router.put(

    "/:id",

    verifyToken,

    allowRoles("DONOR"),

    donationValidation,

    validate,

    updateDonationController

);

router.patch(

    "/:id/cancel",

    verifyToken,

    allowRoles("DONOR"),

    cancelDonationController

);

router.get(

    "/dashboard",

    verifyToken,

    allowRoles("DONOR"),

    getDashboardStatisticsController

);

router.get(

    "/activity",

    verifyToken,

    allowRoles("DONOR"),

    getRecentActivityController

);

router.post(

    "/:id/accept",

    verifyToken,

    allowRoles("RECEIVER"),

    acceptDonationController

);

router.get(

    "/",

    verifyToken,

    allowRoles("RECEIVER"),

    getAvailableDonationsController

);

module.exports = router;