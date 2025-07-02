const Learner = require("../models/Learner");
const Session = require("../models/Session");

exports.createLearner = async (req, res) => {
  try {
    const learner = await Learner.create(req.body);
    res.status(201).json(learner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteLearner = async (req, res) => {
  try {
    await Learner.findByIdAndUpdate(req.params.id, { isActive: false });

    await Session.updateMany(
      { "learners.learner": req.params.id, isArchived: false },
      {
        $set: { "learners.$[elem].attendanceStatus": "cancelled" },
      },
      { arrayFilters: [{ "elem.learner": req.params.id }] }
    );

    res.json({ message: "Learner soft deleted and attendance cancelled." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.learnersWithMoreThan3Sessions = async (req, res) => {
  try {
    const sessions = await Session.find({ isArchived: false, isActive: true });
    const countMap = {};

    sessions.forEach((session) => {
      session.learners.forEach((l) => {
        if (l.attendanceStatus === "present") {
          const id = l.learner.toString();
          countMap[id] = (countMap[id] || 0) + 1;
        }
      });
    });

    const result = [];
    for (const [id, count] of Object.entries(countMap)) {
      if (count > 3) {
        const learner = await Learner.findById(id);
        if (learner && learner.isActive) result.push(learner);
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
