const express = require("express");

const router = express.Router();

const {

    verifyToken

} = require("../middleware/authMiddleware");

const {

    allowRoles

} = require("../middleware/roleMiddleware");

const {

    getNotifications,

    getUnreadNotificationCount,

    markAsRead,

    markAllAsRead

} = require("../controllers/notificationController");

router.get(

    "/",

    verifyToken,

    allowRoles("DONOR","RECEIVER"),

    getNotifications

);

router.get(

    "/unread-count",

    verifyToken,

    allowRoles("DONOR","RECEIVER"),

    getUnreadNotificationCount

);

router.patch(

    "/:id/read",

    verifyToken,

    allowRoles("DONOR","RECEIVER"),

    markAsRead

);

router.patch(

    "/read-all",

    verifyToken,

    allowRoles("DONOR","RECEIVER"),

    markAllAsRead

);

module.exports = router;