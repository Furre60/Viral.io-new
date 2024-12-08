const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route for login
router.post("/login", authController.login);

// Route for signup
router.post("/signup", authController.signup);

module.exports = router;
