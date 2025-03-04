function Book(title, author) {
  return {
    title,
    author,
    details() {
      console.log(`Title: ${this.title}, Author: ${this.author}`);
    },
  };
}

function createLibraray() {
  const books = [];
  return {
    addBook(book) {
      books.push(book);
    },
    removeBook(title) {
      const index = books.findIndex((book) => book.title === title);
      if (index !== -1) {
        books.splice(index, 1);
        console.log(`Book removed: ${title}`);
      }
    },
    listBooks() {
      if (books.length === 0) {
        console.log("No books in the library.");
      } else {
        books.forEach((book) => book.details());
      }
    },
  };
}
