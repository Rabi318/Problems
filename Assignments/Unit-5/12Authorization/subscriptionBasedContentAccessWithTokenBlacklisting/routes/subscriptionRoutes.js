const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  subscribe,
  status,
  renew,
  cancel,
} = require("../controllers/subscriptionController");
const router = express.Router();

router.use(authMiddleware);

router.post("/subscribe", subscribe);
router.get("/subscription-status", status);
router.patch("/renew", renew);
router.post("/cancel-subscription", cancel);

module.exports = router;
