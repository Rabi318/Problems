const transactionLogger = require("../middlewares/transactionLogger");
const { readBooks, writeBooks } = require("../models/bookModel");

exports.getAvailable = (req, res) => {
  const books = readBooks().filter((b) => b.status === "available");
  res.json(books);
};
exports.borrowBook = (req, res) => {
  const id = Number(req.params.id);
  const { readerName } = req.body;
  let books = readBooks();
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ msg: "Book not found" });
  }
  if (book.status !== "available") {
    return res.status(400).json({ msg: "Book is not available" });
  }
  book.status = "borrowed";
  book.borrowedBy = readerName;
  book.borrowedDate = new Date().toISOString().split("T")[0];
  writeBooks(books);
  transactionLogger("borrowed", book, readerName);
  res.json({ msg: "Book borrowed successfully", book });
};

exports.returnBook = (req, res) => {
  let books = readBooks();
  const book = books.find((b) => b.id === Number(req.params.id));
  book.status = "available";
  delete book.borrowedBy;
  delete book.borrowedDate;
  writeBooks(books);
  transactionLogger("returned", book, book.borrowedBy);
  res.json({ msg: "Book returned successfully", book });
};
