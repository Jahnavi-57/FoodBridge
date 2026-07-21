const express = require("express");

const router = express.Router();

const {

    verifyToken

} = require("../middleware/authMiddleware");

const {

    allowRoles

} = require("../middleware/roleMiddleware");

const {

    updateLocationController,
    getProfileController,
    updateProfileController,
    getStatisticsController

} = require("../controllers/receiverController");

router.patch(

    "/location",

    verifyToken,

    allowRoles("RECEIVER"),

    updateLocationController

);
router.get(

    "/profile",

    verifyToken,

    allowRoles("RECEIVER"),

    getProfileController

);


router.patch(

    "/profile",

    verifyToken,

    allowRoles("RECEIVER"),

    updateProfileController

);


router.get(

    "/statistics",

    verifyToken,

    allowRoles("RECEIVER"),

    getStatisticsController

);

module.exports = router;