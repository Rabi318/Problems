const express = require("express");
const router = express.Router();
const learnerController = require("../controllers/learnerController");

// Create a learner
router.post("/", learnerController.createLearner);

// Soft delete learner
router.delete("/:id", learnerController.softDeleteLearner);

// Get learners who attended more than 3 sessions
router.get("/more-than-3", learnerController.learnersWithMoreThan3Sessions);

module.exports = router;
