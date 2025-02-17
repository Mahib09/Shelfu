const express = require("express");
const {
  signUp,
  login,
  googleSignIn,
  getProfile,
} = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/google", googleSignIn);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
