const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const permit = require("../middleware/role");

router.get("/", auth, permit("admin"), userController.getAllUsers);
router.get("/me", auth, userController.getProfile);
router.put("/me", auth, userController.updateProfile);

module.exports = router;
