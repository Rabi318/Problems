const { Consultation } = require("../models/consultationModel");
const { Doctor } = require("../models/doctorModel");

exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ msg: "Doctor created", doctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getPatientsByDoctor = async (req, res) => {
  try {
    const patients = await Consultation.find({
      doctorId: req.params.id,
      isActive: true,
    })
      .populate("patientId")
      .sort({ consultedAt: -1 })
      .limit(parseInt(req.query.limit) || 10);
    res.status(200).json({ msg: "Patients", patients });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getConsultationCount = async (req, res) => {
  try {
    const count = await Consultation.countDocuments({
      doctorId: req.params.id,
    });
    res.json({ totalConsultations: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, { isActive: false });
    await Consultation.updateMany(
      { doctorId: req.params.id },
      { isActive: false }
    );
    res.json({ message: "Doctor and related consultations marked inactive." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
