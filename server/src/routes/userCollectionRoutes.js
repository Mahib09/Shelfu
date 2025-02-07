const express = require("express");
const {
  addMangatoUserCollection,
} = require("../controllers/userCollectionController");

const router = express.Router();

router.post("/", addMangatoUserCollection);

module.exports = router;
