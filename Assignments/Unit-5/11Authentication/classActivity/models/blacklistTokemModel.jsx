const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  toekn: String,
});

const BlacklistToken = mongoose.model("BlacklistTokem", blacklistTokenSchema);
module.exports = BlacklistToken;
