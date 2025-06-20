function dataCheckMiddleware(req, res, next) {
  const { title, description, priority, user } = req.body;
  if (!title || !description || !priority || !user) {
    return res.status(400).json({ msg: "Missing required fields" });
  }
  next();
}

module.exports = dataCheckMiddleware;
