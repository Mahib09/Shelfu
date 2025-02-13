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
router.post("/byseries", verifyToken, getUserCollectionBySeries);
router.post("/bystatus", verifyToken, getUserCollectionByStatus);
router.patch("/:userCollectionId", verifyToken, updateCategoryorNotes);
router.delete("/:userCollectionId", verifyToken, deleteVolume);

module.exports = router;
