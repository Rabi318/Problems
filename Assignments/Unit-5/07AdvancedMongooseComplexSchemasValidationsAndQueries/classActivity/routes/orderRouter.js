const express = require("express");
const OrderModel = require("../models/orderModel");
const UserModel = require("../models/userModel");
const router = express.Router();

//add order through user id
router.post("/", async (req, res) => {
  try {
    let order = await OrderModel.create(req.body);
    res.status(201).json({ msg: "Order created", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    let order = await OrderModel.find().populate("orderedBy");
    res.status(200).json({ msg: "All orders", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//Get order by user id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await UserModel.findById(userId, { name: 1, email: 1 });
    let orders = await OrderModel.find({ orderedBy: userId });
    res.status(200).json({ msg: "Orders by user", orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//cursor methods
router.get("/data", async (req, res) => {
  const { page, limit, sort, order, name } = req.query;
  //for pagination, skip = (page -1)*limit
  let paginatedValue = (page - 1) * limit || 0;
  let limitingValue = limit || 0;
  let soringValue = sort || "orderName";
  let orderingValue = order === "asc" ? 1 : -1;
  let orders = await OrderModel.find({
    orderName: { $regex: name, $options: "i" },
  })
    .skip(paginatedValue)
    .limit(limitingValue)
    .sort({ [soringValue]: orderingValue });
  res.status(200).json({ msg: "Orders by user", orders });
});
module.exports = router;
