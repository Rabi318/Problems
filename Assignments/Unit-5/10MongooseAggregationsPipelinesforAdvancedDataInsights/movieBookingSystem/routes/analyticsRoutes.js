const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

//Total bookings and seats per movie
router.get("/analytics/movie-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: "$movieId",
          totalBookings: { $sum: 1 },
          totalSeats: { $sum: "$seats" },
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//booking history for each user with movie titles
router.get("/analytics/user-bookings", async (req, res) => {
  try {
    const results = await Booking.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $group: {
          _id: "$userId",
          bookings: {
            $push: {
              movieTitle: "$movie.title",
              bookingDate: "$bookingDate",
              seats: "$seats",
            },
          },
        },
      },
    ]);
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//users with more than 2 bookings
router.get("/analytics/top-users", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: "$userId",
          totalBookings: { $sum: 1 },
        },
      },
      { $match: { totalBookings: { $gte: 2 } } },
    ]);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//genre-wise total seats booked
router.get("/analytics/genre-wise-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      {
        $unwind: "$movie",
      },
      {
        $group: {
          _id: "$movie.genre",
          totalSeats: { $sum: "$seats" },
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//active bookings with user and movie info
router.get("/analytics/active-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $match: { status: "Booked" },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $project: {
          _id: 0,
          userName: "$user.name",
          userEmail: "$user.email",
          moviteTitle: "$movie.title",
          seata: 1,
          bookingDate: 1,
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
