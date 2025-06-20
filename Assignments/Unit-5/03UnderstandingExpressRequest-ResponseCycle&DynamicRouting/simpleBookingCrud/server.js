const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, "db.json");

app.use(express.json());

// Utility functions
function readData() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}
function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}
//post
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = readData();
  const newId = data.books.length
    ? data.books[data.books.length - 1].id + 1
    : 1;
  const newBook = { id: newId, title, author, year };
  data.books.push(newBook);
  writeData(data);

  res.status(201).json({ message: "Book added successfully", book: newBook });
});

//get books
app.get("/books", (req, res) => {
  const data = readData();
  res.json(data.books);
});

//get books by author and title
app.get("/books/search", (req, res) => {
  const { author, title } = req.query;
  if (!author && !title) {
    return res
      .status(400)
      .json({ message: "Provide at least 'author' or 'title' as query" });
  }
  const data = readData();
  let results = data.books;
  if (author) {
    results = results.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }
  if (title) {
    results = results.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.json(results);
});
//get book by id
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const book = data.books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

//update book by id
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author, year } = req.body;
  const data = readData();
  const index = data.books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  data.books[index] = { id, title, author, year };
  writeData(data);

  res.json({ message: "Book updated successfully", book: data.books[index] });
});

//delete book by id
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const index = data.books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deleted = data.books.splice(index, 1);
  writeData(data);

  res.json({ message: "Book deleted", deleted: deleted[0] });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
