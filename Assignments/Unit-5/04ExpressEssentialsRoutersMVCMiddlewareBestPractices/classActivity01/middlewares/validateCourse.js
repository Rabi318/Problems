function validateCourse(req, res, next) {
  const { title, instructor, duration } = req.body;
  if (!title || !instructor || !duration) {
    return res.status(400).json({ msg: "Missing required fields" });
  }
  next();
}
module.exports = validateCourse;
