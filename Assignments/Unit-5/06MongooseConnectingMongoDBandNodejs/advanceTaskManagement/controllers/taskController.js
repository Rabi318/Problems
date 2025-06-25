const Task = require("../models/taskModel");

//Create Task
const createTask = async (req, res) => {
  try {
    const existing = await Task.findOne({ title: req.body.title });
    if (existing)
      return res.status(409).json({ error: "Task title must be unique" });
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get all Tasks
const getTasks = async (req, res) => {
  try {
    const { priority, status } = req.query;
    const query = {};
    if (priority) {
      query.priority = priority.toLowerCase();
    }
    if (status === "completed") {
      query.isCompleted = true;
    }
    if (status === "pending") {
      query.isCompleted = false;
    }
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update Task
const updateTask = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.isCompleted === true) {
      updated.completionData = new Date();
    }
    const updated = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { priority } = req.query;
    if (!priority)
      return res.status(400).json({ error: "Priority is required" });
    const result = await Task.deleteMany({ priority: priority.toLowerCase() });
    res.json({ message: `${result.deletedCount} tasks deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTasks,
};
