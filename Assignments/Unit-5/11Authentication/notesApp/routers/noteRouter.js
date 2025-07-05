const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.use(authMiddleware);
router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
