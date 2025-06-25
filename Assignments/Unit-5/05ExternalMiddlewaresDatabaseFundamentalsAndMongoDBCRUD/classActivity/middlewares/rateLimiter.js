const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 2,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

module.exports = limiter;
