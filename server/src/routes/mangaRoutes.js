const express = require("express");
const {
  getSearchResults,
  getMangaDetails,
} = require("../controllers/mangaController");

const router = express.Router();

router.get("/search", getSearchResults);
router.get("/:bookId", getMangaDetails);

module.exports = router;
