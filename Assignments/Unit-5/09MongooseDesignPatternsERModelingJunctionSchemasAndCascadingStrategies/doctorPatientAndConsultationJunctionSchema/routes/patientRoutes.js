const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

router.post("/", patientController.createPatient);
router.get("/:id/doctors", patientController.getDoctorsByPatient);
router.get("/", patientController.getPatientsByGender);
router.delete("/:id", patientController.deletePatient);

module.exports = router;
