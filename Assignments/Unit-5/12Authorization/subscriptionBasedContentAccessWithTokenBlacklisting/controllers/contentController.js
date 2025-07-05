const Content = require("../models/contentModel");

const create = async (req, res) => {
  const { title, type } = req.body;
  const content = await Content.create({
    title,
    type,
    createdBy: req.user.userId,
  });
  res.status(201).json(content);
};

const getFree = async (req, res) => {
  const content = await Content.find({ type: "free" });
  res.json(content);
};

const getPremium = async (req, res) => {
  if (!["premium", "pro"].includes(req.user.plan))
    return res.status(403).json({ error: "Upgrade your plan" });

  const content = await Content.find({ type: "premium" });
  res.json(content);
};

const remove = async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.json({ message: "Content deleted" });
};

module.exports = { create, getFree, getPremium, remove };
