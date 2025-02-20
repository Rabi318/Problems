const library = {
  books: [{ title: "The Hobbit", author: "J.R.R Tolkien", year: 1937 }],

  addBook(book) {
    if (!book || !book.title || !book.author || !book.year) {
      console.log("Book information is incomplete.");
      return;
    }
    this.books.push(book);
    console.log(`Book "${book.title}" added to the library.`);
  },
  findBookByTitle(title) {
    return this.books.find((book) => book.title === title) || "Book not found";
  },

  removeBook(title) {
    const index = this.books.findIndex((book) => book.title === title);
    if (index !== -1) {
      this.books.splice(index, 1);
      console.log(`Book "${title}" removed from the library.`);
    } else {
      console.log("Book not found");
    }
  },
};

library.addBook({
  title: "The Lord of the Rings",
  author: "J.R.R Tolkien",
  year: 1954,
});
console.log("Books in library: ", library.books.length);
