const express = require("express");
const { getSearchResults } = require("../controllers/mangaController");

const router = express.Router();

router.get("/search", getSearchResults);

module.exports = router;
