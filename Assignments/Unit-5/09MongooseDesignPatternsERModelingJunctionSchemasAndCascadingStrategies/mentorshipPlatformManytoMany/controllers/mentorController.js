const Mentor = require("../models/Mentor");
const Session = require("../models/Session");

exports.createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteMentor = async (req, res) => {
  try {
    await Mentor.findByIdAndUpdate(req.params.id, { isActive: false });
    await Session.updateMany(
      { mentor: req.params.id, isArchived: false },
      { isActive: false }
    );
    res.json({ message: "Mentor and their sessions disabled." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.mentorsWithNoActiveSessions = async (req, res) => {
  try {
    const mentors = await Mentor.find({ isActive: true });
    const mentorIdsWithSessions = await Session.distinct("mentor", {
      isActive: true,
      isArchived: false,
    });

    const filtered = mentors.filter(
      (m) => !mentorIdsWithSessions.includes(m._id.toString())
    );
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
