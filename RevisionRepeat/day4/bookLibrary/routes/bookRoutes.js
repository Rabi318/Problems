const express = require("express");

const Book = require("../models/bookModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json({ msg: "Successfully book created", data: savedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Book Creation Failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { author, available, page = 1, limit = 5 } = req.query;
    const filter = {};
    if (author) filter.author = author;
    if (available !== undefined) filter.available = available === "true";
    const totalBooks = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({
      total: totalBooks,
      page: Number(page),
      limit: Number(limit),
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Getting Books Data Failed" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res.status(404).json({ msg: "Book for this id not found" });
    book.available = !book.available;
    await book.save();
    res.json({ mag: "Book updated successfully", data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Update book failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ msg: "Book not found for the given id" });
    res.json({ msg: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Delted book failed" });
  }
});

module.exports = router;
