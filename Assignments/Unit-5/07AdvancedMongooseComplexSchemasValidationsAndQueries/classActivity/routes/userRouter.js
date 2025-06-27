const express = require("express");
const UserModel = require("../models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = await UserModel.create(req.body);
    res.status(201).json({ msg: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.patch("/address", async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ msg: "User Not Found!" });
    }
    user.address.push(req.body);
    await user.save();
    res.status(201).json({ msg: "Address added", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.patch("/order", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ msg: "User Not Found!" });
    }
    user.order.push(req.body);
    await user.save();
    res.status(201).json({ msg: "Order added", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//female users having age less than 30
router.get("/female30", async (req, res) => {
  try {
    let user = await UserModel.find(
      {
        $and: [{ gender: "female" }, { age: { $lte: 30 } }],
      },
      { name: 1, age: 1, gender: 1 }
    );
    res.status(200).json({ msg: "Female users having age less than 30", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//users from delhi and karantaka
router.get("/delhiKarantaka", async (req, res) => {
  try {
    let users = await UserModel.find(
      { "address.state": { $in: ["Delhi", "Karnataka"] } },
      { name: 1, address: 1 }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//users whose order is more than 5000
router.get("/moreThan5000", async (req, res) => {
  let users = await UserModel.find(
    { "order.orderPrice ": { $gt: 5000 } },
    { name: 1, order: 1 }
  );
});

module.exports = router;
