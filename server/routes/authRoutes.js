const express = require("express");
const router = express.Router();

const { signup, login} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const {
    signupValidation,
} = require("../validators/authValidation");
const { validate } = require("../middleware/validationMiddleware");
router.post(
    "/signup",
    signupValidation,
    validate,
    signup
);
router.get("/profile", verifyToken, (req, res) => {

    res.status(200).json({
        user: req.user
    });

});

router.post("/login", login);
module.exports = router;