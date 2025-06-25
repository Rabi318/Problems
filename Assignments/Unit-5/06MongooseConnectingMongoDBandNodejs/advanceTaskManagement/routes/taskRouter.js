const express = require("express");
const router = express.Router();

const { validateTask } = require("../middlewares/taskMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTasks,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", validateTask, createTask);
router.patch("/:id", validateTask, updateTask);
router.delete("/", deleteTasks);

module.exports = router;
