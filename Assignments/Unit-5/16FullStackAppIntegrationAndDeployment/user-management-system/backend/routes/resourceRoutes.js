const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const Resource = require("../models/resourseModel");

const router = express.Router();

router.post("/", verifyToken, checkRole(["admin"]), async (req, res) => {
  try {
    const resource = new Resource({ ...req.body, createdBy: req.user._id });
    await resource.save();
    res
      .status(201)
      .json({ msg: "Resource created successfully", data: resource });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error creating resource" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const resources = await Resource.find().populate("createdBy", "name email");
    if (!resources.length) {
      return res.status(404).json({ msg: "No resources found" });
    }
    res
      .status(200)
      .json({ msg: "Resources retrieved successfully", data: resources });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error retrieving resources" });
  }
});

router.put("/:id", verifyToken, checkRole(["admin"]), async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!resource) {
      return res.status(404).json({ msg: "Resource not found" });
    }
    res
      .status(200)
      .json({ msg: "Resource updated successfully", data: resource });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error updating resource" });
  }
});

router.delete("/:id", verifyToken, checkRole(["admin"]), async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ msg: "Resource not found" });
    }
    res.status(200).json({ msg: "Resource deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error deleting resource" });
  }
});

module.exports = router;
