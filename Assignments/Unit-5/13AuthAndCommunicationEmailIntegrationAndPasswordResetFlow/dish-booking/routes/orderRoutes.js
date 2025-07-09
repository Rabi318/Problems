const express = require("express");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware(["user"]), async (req, res) => {
  const chefs = await User.find({ role: "chef" });
  const randomChef = chefs[Math.floor(Math.random() * chefs.length)];

  const order = await Order.create({
    user: req.user.id,
    dish: req.body.dish,
    chef: randomChef._id,
  });
  res.json(order);
});

router.get("/", authMiddleware(["user", "chef"]), async (req, res) => {
  let filter = {};
  if (req.user.role === "user") filter.user = req.user.id;
  if (req.user.role === "chef") filter.chef = req.user.id;

  const orders = await Order.find(filter).populate("dish");
  res.json(orders);
});

router.put("/:id/status", authMiddleware(["chef"]), async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.chef.toString() !== req.user.id)
    return res.status(403).json({ message: "Not your order" });

  order.status = req.body.status;
  await order.save();
  res.json(order);
});

module.exports = router;
