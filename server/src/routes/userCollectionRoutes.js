const express = require("express");
const {
  addMangatoUserCollection,
  getUserCollection,
  getUserCollectionBySeries,
  updateCategoryorNotes,
  deleteVolume,
} = require("../controllers/userCollectionController");

const router = express.Router();

router.post("/", addMangatoUserCollection);
router.get("/:userId", getUserCollection);
router.get("/:userId/:seriesName", getUserCollectionBySeries);
router.patch("/:userCollectionId", updateCategoryorNotes);
router.delete("/:userCollectionId", deleteVolume);

module.exports = router;
