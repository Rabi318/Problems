const express = require("express");
const doctorController = require("../controllers/doctorController");
const router = express.Router();

router.post("/", doctorController.createDoctor);
router.get("/:id/patients", doctorController.getPatientsByDoctor);
router.get("/:id/consultations/count", doctorController.getConsultationCount);
router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;
