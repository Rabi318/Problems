const { readBooks, writeBooks } = require("../models/bookModel");

exports.addBook = (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ msg: "Missing required fields" });
  }
  const books = readBooks();
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    genre,
    publishedYear,
    status: "available",
  };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json({ msg: "Book added successfully", book: newBook });
};

exports.getAllBooks = (req, res) => res.json(readBooks());

exports.updateBook = (req, res) => {
  const id = Number(req.params.id);
  let books = readBooks();
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) {
    return res.status(404).json({ msg: "Book not found" });
  }
  const { title, author, genre, publishedYear } = req.body;
  const book = books[idx];
  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (publishedYear) book.publishedYear = publishedYear;
  writeBooks(books);
  res.json({ msg: "Book updated", book });
};

exports.deleteBook = (req, res) => {
  const id = Number(req.params.id);
  let books = readBooks();
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) {
    return res.status(404).json({ msg: "Book not found" });
  }
  books.splice(idx, 1);
  writeBooks(books);
  res.json({ msg: "Book deleted" });
};
