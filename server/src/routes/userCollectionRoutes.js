const express = require("express");
const {
  addMangatoUserCollection,
  getUserCollection,
  getUserCollectionBySeries,
  getUserCollectionByStatus,
  updateCategoryorNotes,
  deleteVolume,
} = require("../controllers/userCollectionController");

const router = express.Router();

router.post("/", addMangatoUserCollection);
router.get("/:userId", getUserCollection);
router.get("/byseries/:userId/:seriesName", getUserCollectionBySeries);
router.get("/bystatus/:userId/:status", getUserCollectionByStatus);
router.patch("/:userCollectionId", updateCategoryorNotes);
router.delete("/:userCollectionId", deleteVolume);

module.exports = router;
