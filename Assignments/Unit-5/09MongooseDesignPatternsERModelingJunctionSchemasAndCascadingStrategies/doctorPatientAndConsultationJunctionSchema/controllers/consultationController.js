const { Consultation } = require("../models/consultationModel");
const { Patient } = require("../models/patientModel");
const { Doctor } = require("../models/doctorModel");

exports.createConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, notes } = req.body;

    const doctor = await Doctor.findOne({ _id: doctorId, isActive: true });
    const patient = await Patient.findOne({ _id: patientId, isActive: true });

    if (!doctor || !patient) {
      return res
        .status(400)
        .json({ error: "Doctor or Patient not active or not found" });
    }

    const consultation = await Consultation.create({
      doctorId,
      patientId,
      notes,
    });
    res.status(201).json(consultation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecentConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ isActive: true })
      .sort({ consultedAt: -1 })
      .limit(5);
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
