const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderName: { type: String, required: true },
  orderPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  modeOfPayment: {
    type: String,
    enum: ["COD", "UPI", "Net Banking", "Card"],
  },
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const OrderModel = mongoose.model("order", orderSchema);
module.exports = OrderModel;
