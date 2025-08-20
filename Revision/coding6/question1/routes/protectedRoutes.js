const express = require("express");
const authenticate = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { listUsers } = require("../controllers/adminController");

const router = express.Router();

router.get("/user/profile", authenticate, (req, res) => {
  res.json({ msg: `Hello user ${req.user.id}, role: ${req.user.role}` });
});

router.get("/admin/users", authenticate, authorize("admin"), listUsers);

module.exports = router;
