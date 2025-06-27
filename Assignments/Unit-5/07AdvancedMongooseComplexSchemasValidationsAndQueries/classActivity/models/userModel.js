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
});

const addressSchema = new mongoose.Schema({
  houseNo: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  moble: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18, max: 100 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, default: "1234" },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
  address: [addressSchema],
  // order: [orderSchema],
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
