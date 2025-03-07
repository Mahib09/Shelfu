const express = require("express");
const {
  addMangatoUserCollection,
  getUserCollection,
  updateCategoryorNotes,
  deleteVolume,
} = require("../controllers/userCollectionController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, addMangatoUserCollection);
router.get("/:userId", verifyToken, getUserCollection);
router.patch("/:userCollectionId", verifyToken, updateCategoryorNotes);
router.delete("/:userCollectionId", verifyToken, deleteVolume);

module.exports = router;
