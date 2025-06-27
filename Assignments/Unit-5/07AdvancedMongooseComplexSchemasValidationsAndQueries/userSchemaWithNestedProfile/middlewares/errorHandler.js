module.exports = (err, req, res, next) => {
  console.log(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: "Email already exists" });
  }

  res.status(500).json({ message: "Internal server error" });
};
