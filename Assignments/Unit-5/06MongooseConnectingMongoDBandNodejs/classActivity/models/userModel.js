const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  isLoggedin: Boolean,
  location: String,
});

//create model
const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
