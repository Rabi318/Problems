const Library = require("../models/libraryModel");

// Middleware: Validate book data
const validateBookData = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Incomplete Data" });
  }
  next();
};

// Middleware: Check user borrowing limit
const checkBorrowLimit = async (req, res, next) => {
  const { borrowerName } = req.body;
  const borrowedBooks = await Library.countDocuments({
    borrowerName,
    status: "borrowed",
  });

  if (borrowedBooks >= 3) {
    return res
      .status(409)
      .json({ message: "Borrowing limit exceeded (3 books max)" });
  }

  next();
};

module.exports = {
  validateBookData,
  checkBorrowLimit,
};
