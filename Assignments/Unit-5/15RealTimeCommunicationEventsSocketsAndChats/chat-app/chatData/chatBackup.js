const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  messages: [String],
  createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = { Chat };
