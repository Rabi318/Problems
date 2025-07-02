const mongoose = require("mongoose");
const { Enrollment } = require("./enrollmentModel");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  isDeleted: Boolean,
});

//pre hook
courseSchema.pre("save", async function (next) {
  console.log("Hook");
  let enrollments = await Enrollment.updateMany(
    { courseId: this._id },
    { $set: { isActive: false } }
  );
  next();
});
const Course = mongoose.model("Course", courseSchema);
module.exports = { Course };
