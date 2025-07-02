const express = require("express");
const router = express.Router();
const controller = require("../controllers/mentorController");

router.post("/", controller.createMentor);
router.delete("/:id", controller.softDeleteMentor);
router.get("/no-active-sessions", controller.mentorsWithNoActiveSessions);

module.exports = router;
