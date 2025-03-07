const books = require("./books");

const summaries = books.map((book) => book.getSummary());

console.log(summaries);
