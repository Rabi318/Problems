const express = require("express");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.use(auth);

router.post("/", role("user"), bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.put("/:id", role("user"), bookingController.updateBooking);
router.delete("/:id", role("user"), bookingController.cancelBooking);

//admin routes
router.patch("/:id/approve", role("admin"), bookingController.approveBooking);
router.patch("/:id/reject", role("admin"), bookingController.rejectBooking);
router.delete("/:id", role("admin"), bookingController.deleteBooking);

module.exports = router;
