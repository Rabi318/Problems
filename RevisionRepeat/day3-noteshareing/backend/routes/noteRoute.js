const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/role");
const noteController = require("../controllers/noteController");

router.post("/", auth, noteController.createNote);
router.get("/", auth, noteController.listNotes);
router.get("/all", auth, permit("admin"), noteController.adminGetAllNotes);
router.get("/shared", auth, noteController.getSharedNotes);
router.get("/:id", auth, noteController.getNote);
router.put("/:id", auth, noteController.updateNote);
router.delete("/:id", auth, noteController.deleteNote);
router.post("/:id/share", auth, noteController.shareNote);

module.exports = router;
