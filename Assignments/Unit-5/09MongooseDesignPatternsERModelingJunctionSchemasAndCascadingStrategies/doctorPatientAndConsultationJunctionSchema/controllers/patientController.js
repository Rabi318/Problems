const { Consultation } = require("../models/consultationModel");
const { Patient } = require("../models/patientModel");

exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorsByPatient = async (req, res) => {
  try {
    const doctors = await Consultation.find({
      patientId: req.params.id,
      isActive: true,
    })
      .populate({ path: "doctorId", select: "name specialization -_id" })
      .select("doctorId");

    res.json(doctors.map((c) => c.doctorId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientsByGender = async (req, res) => {
  try {
    const gender = req.query.gender;
    const patients = await Patient.find({ gender, isActive: true });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, { isActive: false });
    await Consultation.updateMany(
      { patientId: req.params.id },
      { isActive: false }
    );
    res.json({ message: "Patient and related consultations marked inactive." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
