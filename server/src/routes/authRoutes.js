const express = require("express");
const { signUp, login, getProfile } = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
