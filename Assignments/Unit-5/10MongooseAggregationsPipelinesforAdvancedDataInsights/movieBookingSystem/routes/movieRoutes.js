const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

router.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(200).send({ message: "Movie created successfully", movie });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
