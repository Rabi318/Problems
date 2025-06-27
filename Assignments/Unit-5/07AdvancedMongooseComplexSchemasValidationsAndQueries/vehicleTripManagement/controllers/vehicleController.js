const Vehicle = require("../models/vehicle");

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ message: "Vehicle created", vehicle });
  } catch (err) {
    next(err);
  }
};

exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.json({ vehicles });
  } catch (err) {
    next(err);
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle updated", vehicle });
  } catch (err) {
    next(err);
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
};

// B. Trip Operations
exports.addTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    vehicle.trips.push(req.body);
    await vehicle.save();
    res.status(201).json({ message: "Trip added", vehicle });
  } catch (err) {
    next(err);
  }
};
exports.updateTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const trip = vehicle.trips.id(req.params.tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    Object.assign(trip, req.body);
    await vehicle.save();

    res.json({ message: "Trip updated", vehicle });
  } catch (err) {
    next(err);
  }
};
exports.deleteTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    vehicle.trips.id(req.params.tripId)?.remove();
    await vehicle.save();

    res.json({ message: "Trip deleted", vehicle });
  } catch (err) {
    next(err);
  }
};

// C. Advanced Queries
exports.getLongTrips = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ "trips.distance": { $gt: 200 } });
    res.json({ vehicles });
  } catch (err) {
    next(err);
  }
};

exports.getTripsFromCities = async (req, res, next) => {
  try {
    const cities = ["Delhi", "Mumbai", "Bangalore"];
    const vehicles = await Vehicle.find({
      "trips.startLocation": { $in: cities },
    });
    res.json({ vehicles });
  } catch (err) {
    next(err);
  }
};
exports.getTripsAfterDate = async (req, res, next) => {
  try {
    const date = new Date("2024-01-01");
    const vehicles = await Vehicle.find({ "trips.startTime": { $gte: date } });
    res.json({ vehicles });
  } catch (err) {
    next(err);
  }
};

exports.getCarsAndTrucks = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ type: { $in: ["car", "truck"] } });
    res.json({ vehicles });
  } catch (err) {
    next(err);
  }
};

// Bonus: Get total distance
exports.getTotalDistance = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const totalDistance = vehicle.totalDistance();
    res.json({ totalDistance });
  } catch (err) {
    next(err);
  }
};
