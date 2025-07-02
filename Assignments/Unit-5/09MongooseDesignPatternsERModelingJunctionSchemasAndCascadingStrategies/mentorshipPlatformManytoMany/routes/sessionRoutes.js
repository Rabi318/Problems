const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

// Create a session
router.post("/", sessionController.createSession);

// Archive a session (soft delete)
router.delete("/:id/archive", sessionController.archiveSession);

// Get recent 5 sessions
router.get("/recent", sessionController.getRecentSessions);

// Get active sessions by mentor id
router.get("/mentor/:id", sessionController.getSessionsByMentor);

// Get active sessions by learner id
router.get("/learner/:id", sessionController.getSessionsByLearner);

// Count learners for a mentor's sessions
router.get(
  "/mentor/:id/learners/count",
  sessionController.countLearnersForMentor
);

// List mentors consulted by a learner
router.get("/learner/:id/mentors", sessionController.listMentorsByLearner);

// List learners for a session
router.get("/:id/learners", sessionController.listLearnersForSession);

module.exports = router;
