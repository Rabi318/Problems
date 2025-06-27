const mongoose = require("mongoose");

const validator = require("validator");

const profileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    required: true,
    enum: ["fb", "twitter", "github", "instagram", "linkedin"],
  },
  ulr: {
    type: String,
    required: true,
    validator: {
      validator: validator.isURL,
      message: "Invalid URL format",
    },
  },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  profiles: [profileSchema],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
