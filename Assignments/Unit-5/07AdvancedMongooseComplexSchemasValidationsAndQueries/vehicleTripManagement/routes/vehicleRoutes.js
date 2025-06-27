const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

// Vehicle CRUD
router.post("/", vehicleController.createVehicle);
router.get("/", vehicleController.getVehicles);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

// Trip operations
router.post("/:id/trips", vehicleController.addTrip);
router.put("/:id/trips/:tripId", vehicleController.updateTrip);
router.delete("/:id/trips/:tripId", vehicleController.deleteTrip);

// Advanced queries
router.get("/query/long-trips", vehicleController.getLongTrips);
router.get("/query/from-cities", vehicleController.getTripsFromCities);
router.get("/query/trips-after-2024", vehicleController.getTripsAfterDate);
router.get("/query/car-or-truck", vehicleController.getCarsAndTrucks);

// Bonus
router.get("/:id/total-distance", vehicleController.getTotalDistance);

module.exports = router;
