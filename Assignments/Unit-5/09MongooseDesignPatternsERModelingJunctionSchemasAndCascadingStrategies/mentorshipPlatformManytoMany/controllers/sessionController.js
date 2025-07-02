const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.archiveSession = async (req, res) => {
  try {
    await Session.findByIdAndUpdate(req.params.id, { isArchived: true });
    res.json({ message: "Session archived." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecentSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ isArchived: false })
      .sort({ time: -1 })
      .limit(5);
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessionsByMentor = async (req, res) => {
  try {
    const sessions = await Session.find({
      mentor: req.params.id,
      isArchived: false,
      isActive: true,
    }).populate("learners.learner");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessionsByLearner = async (req, res) => {
  try {
    const sessions = await Session.find({
      "learners.learner": req.params.id,
      isArchived: false,
      isActive: true,
    }).populate("mentor");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.countLearnersForMentor = async (req, res) => {
  try {
    const sessions = await Session.find({
      mentor: req.params.id,
      isArchived: false,
    });

    const learnerSet = new Set();
    sessions.forEach((session) => {
      session.learners.forEach((l) => learnerSet.add(l.learner.toString()));
    });

    res.json({ totalLearners: learnerSet.size });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listMentorsByLearner = async (req, res) => {
  try {
    const sessions = await Session.find({
      "learners.learner": req.params.id,
      isArchived: false,
    }).populate("mentor");

    const mentors = new Map();
    sessions.forEach((s) => {
      if (s.mentor) mentors.set(s.mentor._id.toString(), s.mentor);
    });

    res.json(Array.from(mentors.values()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listLearnersForSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate(
      "learners.learner"
    );
    res.json(session.learners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
