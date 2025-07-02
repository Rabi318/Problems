const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Movie = require("../models/Movie");

router.post("/bookings", async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);

    if (!user || !movie) {
      return res.status(400).send({ error: "Invalid user or movie ID" });
    }

    const booking = new Booking(req.body);
    await booking.save();
    res.status(200).send({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
