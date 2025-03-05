function Book(title, author) {
  return {
    title,
    author,
    details() {
      console.log(`Title: ${this.title}, Author: ${this.author}`);
    },
  };
}

function createLibrary() {
  const books = [];
  return {
    addBook(book) {
      books.push(book);
    },
    removeBook(title) {
      const index = books.findIndex((book) => book.title === title);
      if (index !== -1) {
        books.splice(index, 1);
        // console.log(`Book removed: ${title}`);
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
const library = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);

library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee
// Title: 1984, Author: George Orwell

library.removeBook("1984");
library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee
