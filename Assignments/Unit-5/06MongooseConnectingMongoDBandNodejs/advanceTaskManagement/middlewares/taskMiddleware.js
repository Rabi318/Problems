const validateTask = (req, res, next) => {
  const { title, description, priority } = req.body;
  const allowedPriorities = ["low", "medium", "high"];
  if (!title || !description || !priority) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!allowedPriorities.includes(priority.toLowerCase())) {
    return res
      .status(400)
      .json({ error: "Priority should be low, medium or high" });
  }
  next();
};

module.exports = { validateTask };
