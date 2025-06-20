const express = require("express");
const {
  getAvailable,
  borrowBook,
  returnBook,
} = require("../controllers/readerController");

const returnCheck = require("../middlewares/returnCheckMiddleware");
const router = express.Router();

router.get("/books", getAvailable);
router.post("/borrow/:id", borrowBook);
router.post("/return/:id", returnCheck, returnBook);

module.exports = router;
