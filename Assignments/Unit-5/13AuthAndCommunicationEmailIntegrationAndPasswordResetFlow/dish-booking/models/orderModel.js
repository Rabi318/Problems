const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"],
    default: "Order Received",
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
