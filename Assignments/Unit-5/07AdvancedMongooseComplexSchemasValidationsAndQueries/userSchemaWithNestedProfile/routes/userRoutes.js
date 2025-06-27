const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/get-users", userController.getUsers);
router.get("/search", userController.search);
router.post("/add-user", userController.addUser);
router.post("/add-profile/:userId", userController.addProfile);
router.put(
  "/update-profile/:userId/:profileName",
  userController.updateProfile
);
router.delete(
  "/delete-profile/:userId/:profileName",
  userController.deleteProfile
);

module.exports = router;
