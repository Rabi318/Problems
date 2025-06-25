const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "borrowed", "reserved"],
    default: "available",
  },
  borrowerName: { type: String, default: null },
  borrowDate: { type: Date, default: null },
  dueDate: { type: Date, default: null },
  returnDate: { type: Date, default: null },
  overdueFees: { type: Number, default: 0 },
});

module.exports = mongoose.model("Library", LibrarySchema);
