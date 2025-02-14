const express = require("express");
const {
  signUp,
  login,
  googleSignIn,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/google", googleSignIn);

module.exports = router;
