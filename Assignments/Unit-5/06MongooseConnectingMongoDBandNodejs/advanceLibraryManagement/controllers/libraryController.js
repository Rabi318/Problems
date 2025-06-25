const Library = require("../models/libraryModel");

const addBook = async (req, res) => {
  try {
    const newBook = new Library(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const borrowBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.status !== "available")
      return res
        .status(409)
        .json({ message: "Book is not available for borrowing" });

    const { borrowerName } = req.body;
    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    book.status = "borrowed";
    book.borrowerName = borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;

    await book.save();
    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const returnBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status !== "borrowed")
      return res
        .status(409)
        .json({ message: "Book is not currently borrowed" });

    const returnDate = new Date();
    let overdueFees = 0;

    if (book.dueDate && returnDate > book.dueDate) {
      const lateDays = Math.ceil(
        (returnDate - book.dueDate) / (1000 * 60 * 60 * 24)
      );
      overdueFees = lateDays * 10;
    }

    book.status = "available";
    book.returnDate = returnDate;
    book.overdueFees = overdueFees;
    book.borrowerName = null;
    book.borrowDate = null;
    book.dueDate = null;

    await book.save();
    res.status(200).json({ message: "Book returned", overdueFees, book });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getBooks = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.title) query.title = new RegExp(req.query.title, "i");

    const books = await Library.find(query);
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.status === "borrowed")
      return res.status(409).json({ message: "Cannot delete a borrowed book" });

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  addBook,
  borrowBook,
  returnBook,
  getBooks,
  deleteBook,
};
