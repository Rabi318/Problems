const Book = require("../models/Book");
const User = require("../models/User");

exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  if (!title || !author)
    return res.status(400).json({ msg: "Title and author required" });

  try {
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rentBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    if (!user || !book)
      return res.status(404).json({ msg: "User or book not found" });

    // Avoid duplicates
    if (!user.rentedBooks.includes(bookId)) user.rentedBooks.push(bookId);
    if (!book.rentedBy.includes(userId)) book.rentedBy.push(userId);

    await user.save();
    await book.save();

    res.json({ msg: "Book rented successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    if (!user || !book)
      return res.status(404).json({ msg: "User or book not found" });

    user.rentedBooks.pull(bookId);
    book.rentedBy.pull(userId);

    await user.save();
    await book.save();

    res.json({ msg: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookRenters = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("rentedBy");
    if (!book) return res.status(404).json({ msg: "Book not found" });
    res.json(book.rentedBy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ msg: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    // Remove book from all users
    await User.updateMany(
      { rentedBooks: book._id },
      { $pull: { rentedBooks: book._id } }
    );

    await book.remove();
    res.json({ msg: "Book deleted and references cleaned" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
