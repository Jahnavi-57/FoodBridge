const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const {

    getUserProfileController,

    updateUserProfileController

} = require("../controllers/userController");



router.get(

    "/profile",

    verifyToken,

    getUserProfileController

);



router.put(

    "/profile",

    verifyToken,

    updateUserProfileController

);



module.exports = router;