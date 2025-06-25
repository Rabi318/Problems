const express = require("express");
const router = express.Router();
const {
  checkBorrowLimit,
  validateBookData,
} = require("../middlewares/libraryMiddleware");
const {
  getBooks,
  addBook,
  borrowBook,
  returnBook,
  deleteBook,
} = require("../controllers/libraryController");

router.get("/books", getBooks);
router.post("/books", validateBookData, addBook);
router.patch("/borrow/:id", checkBorrowLimit, borrowBook);
router.patch("/return/:id", returnBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
