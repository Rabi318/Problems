const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  getFree,
  getPremium,
  create,
  remove,
} = require("../controllers/contentController");

router.get("/free", auth, getFree);
router.get("/premium", auth, getPremium);
router.post("/", auth, role("admin"), create);
router.delete("/:id", auth, role("admin"), remove);

module.exports = router;
