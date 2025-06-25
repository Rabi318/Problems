const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get all tasks or filter by status or due data
router.get("/", async (req, res) => {
  const { status, dueData } = req.query;
  const query = {};
  if (status) {
    query.status = status;
  }
  if (dueData) {
    query.dueData = { $gte: new Date(dueData) };
  }
  try {
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update a task by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Task not Found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not Found" });
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
