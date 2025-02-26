const express = require("express");
const {
  signUp,
  login,
  getProfile,
  logout,
} = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
