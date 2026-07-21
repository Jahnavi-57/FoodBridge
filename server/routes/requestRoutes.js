const express = require("express");

const router = express.Router();

const {

    verifyToken

} = require("../middleware/authMiddleware");

const {

    allowRoles

} = require("../middleware/roleMiddleware");

const {

    createRequestController,
    getMyRequestsController,
    getDonationRequestsController,
    approveRequestController,
    rejectRequestController,
    completeRequestController

} = require("../controllers/requestController");




router.post(

    "/donations/:id/request",

    verifyToken,

    allowRoles("RECEIVER"),

    createRequestController

);




router.get(

    "/my",

    verifyToken,

    allowRoles("RECEIVER"),

    getMyRequestsController

);



router.get(

    "/donations/:id",

    verifyToken,

    allowRoles("DONOR"),

    getDonationRequestsController

);



router.patch(

    "/:id/approve",

    verifyToken,

    allowRoles("DONOR"),

    approveRequestController

);


router.patch(

    "/:id/reject",

    verifyToken,

    allowRoles("DONOR"),

    rejectRequestController

);



router.patch(

    "/:id/collect",

    verifyToken,

    allowRoles("RECEIVER"),

    completeRequestController

);

module.exports = router;