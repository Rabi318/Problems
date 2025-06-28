const Book = require("../models/bookModel");
const Member = require("../models/memberModel");

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { memberId, bookId } = req.body;
  try {
    const member = await Member.findById(memberId);
    const book = await Book.findById(bookId);

    if (!member || !book)
      return res.status(404).json({ message: "Member or Book not found" });
    if (book.status === "borrowed")
      return res.status(400).json({ message: "Book already borrowed" });

    if (!member.borrowedBooks.includes(book._id))
      member.borrowedBooks.push(book._id);
    if (!book.borrowers.includes(member._id)) book.borrowers.push(member._id);

    book.status = "borrowed";

    await member.save();
    await book.save();

    res.json({ message: "Book borrowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const { memberId, bookId } = req.body;
  try {
    const member = await Member.findById(memberId);
    const book = await Book.findById(bookId);

    if (!member || !book)
      return res.status(404).json({ message: "Member or Book not found" });

    member.borrowedBooks.pull(book._id);
    book.borrowers.pull(member._id);

    // Status update handled in post-save hook
    await member.save();
    await book.save();

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookBorrowers = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("borrowers");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book.borrowers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Remove book from all members
    await Member.updateMany(
      { borrowedBooks: book._id },
      { $pull: { borrowedBooks: book._id } }
    );

    await book.remove();
    res.json({ message: "Book deleted and removed from all members" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
