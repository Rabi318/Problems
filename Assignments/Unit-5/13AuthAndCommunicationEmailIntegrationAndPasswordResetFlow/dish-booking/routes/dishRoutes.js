const express = require("express");
const Dish = require("../models/dishModel");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware(["admin"]));

router.post("/", async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json({ msg: "Dish created", dish });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json({ msg: "Dishes fetched", dishes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!dish) return res.status(404).json({ msg: "Dish not found" });
    res.status(200).json({ msg: "Dish updated", dish });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ msg: "Dish not found" });
    res.status(200).json({ msg: "Dish deleted", dish });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
