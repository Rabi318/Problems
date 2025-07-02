const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  learners: [
    {
      learner: { type: mongoose.Schema.Types.ObjectId, ref: "Learner" },
      attendanceStatus: {
        type: String,
        enum: ["present", "absent", "cancelled"],
        default: "present",
      },
      feedback: String,
    },
  ],
  topic: String,
  time: Date,
  notes: String,
  isArchived: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Session", sessionSchema);
