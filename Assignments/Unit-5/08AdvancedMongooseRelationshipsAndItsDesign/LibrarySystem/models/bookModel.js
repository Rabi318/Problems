const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
    borrowers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//check availability of book before borrwoing
bookSchema.pre("save", async function (next) {
  if (
    this.isModified("status") &&
    this.status === "borrowed" &&
    this.borrowers.length === 0
  ) {
    return next(new Error("Can not mark as borrowed without borrowers"));
  }
  next();
});

//after returning update the status
bookSchema.post("save", function (doc) {
  if (doc.borrowers.length === 0 && doc.status !== "available") {
    doc.status = "available";
    doc.save();
  }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
