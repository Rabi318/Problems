const User = require("../models/userModel");

const subscribe = async (req, res) => {
  const { plan } = req.body;
  if (!["free", "premium", "pro"].includes(plan)) {
    return res.status(400).json({ error: "Invalid plan" });
  }

  try {
    const user = await User.findById(req.user.userId);
    user.subscription.plan = plan;
    user.subscription.expiresAt = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ); // 30 days
    await user.save();
    res.json({ message: `Subscribed to ${plan}` });
  } catch {
    res.status(400).json({ error: "Subscription failed" });
  }
};

const status = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({
    plan: user.subscription.plan,
    expiresAt: user.subscription.expiresAt,
  });
};

const renew = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (
    !user.subscription.expiresAt ||
    new Date() > user.subscription.expiresAt
  ) {
    return res
      .status(400)
      .json({ error: "Subscription expired. Buy a new one." });
  }

  user.subscription.expiresAt = new Date(
    user.subscription.expiresAt.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  await user.save();
  res.json({ message: "Subscription renewed" });
};

const cancel = async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.subscription = { plan: "free", expiresAt: null };
  await user.save();
  res.json({ message: "Subscription cancelled" });
};

module.exports = { subscribe, status, renew, cancel };
