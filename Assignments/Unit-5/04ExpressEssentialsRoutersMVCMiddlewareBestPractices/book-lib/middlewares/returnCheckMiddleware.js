const { readBooks } = require("../models/bookModel");

module.exports = (req, res, next) => {
  const id = Number(req.params.id);
  const book = readBooks().find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  const borrowDate = new Date(book.borrowedDate);
  const diffTime = Date.now() - borrowDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 3) {
    return res
      .status(400)
      .json({ error: "Book cannot be returned within 3 days of borrowing." });
  }
  req.book = book;

  next();
};
