const Booking = require("../models/bookModel");

const createBooking = async (req, res) => {
  const { service, datetime } = req.body;
  try {
    const booking = await Booking.create({
      user: req.user.userId,
      service,
      datetime,
    });
    res.status(201).json({ msg: "Booking created", booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getBookings = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.userId };
    const bookings = await Booking.find(filter).populate(
      "user",
      "username email"
    );
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!booking || booking.status !== "pending") {
      return res.status(400).json({ msg: "Update not allowed" });
    }

    Object.assign(booking, req.body);
    await booking.save();
    res.json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!booking || booking.status !== "pending") {
      return res.status(400).json({ msg: "Update not allowed" });
    }
    booking.status = "cancelled";
    await booking.save();
    res.json({ msg: "Booking Cancelled" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "approved";
    await booking.save();
    res.json({ message: "Booking approved", booking });
  } catch (error) {
    res.status(400).json({ error: "Approval failed" });
  }
};

const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "rejected";
    await booking.save();
    res.json({ message: "Booking rejected", booking });
  } catch {
    res.status(400).json({ error: "Rejection failed" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch {
    res.status(400).json({ error: "Delete failed" });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  cancelBooking,
  approveBooking,
  rejectBooking,
  deleteBooking,
};
