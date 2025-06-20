const express = require("express");
const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/books", getAllBooks);
router.post("/books", addBook);
router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
