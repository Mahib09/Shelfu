const express = require("express");
const {
  addMangatoUserCollection,
  getUserCollection,
  getUserCollectionBySeries,
  getUserCollectionByStatus,
  updateCategoryorNotes,
  deleteVolume,
} = require("../controllers/userCollectionController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, addMangatoUserCollection);
router.get("/:userId", verifyToken, getUserCollection);
router.get(
  "/byseries/:userId/:seriesName",
  verifyToken,
  getUserCollectionBySeries
);
router.get("/bystatus/:userId/:status", verifyToken, getUserCollectionByStatus);
router.patch("/:userCollectionId", verifyToken, updateCategoryorNotes);
router.delete("/:userCollectionId", verifyToken, deleteVolume);

module.exports = router;
