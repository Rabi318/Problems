const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

router.get("/public", (req, res) => {
  res.json({ msg: "This is a public endpoint!" });
});

router.get("/limited", limiter, (req, res) => {
  res.json({ msg: "This is a limited endpoint!" });
});
module.exports = router;
