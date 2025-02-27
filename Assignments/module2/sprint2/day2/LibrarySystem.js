let books = [];

function addBook(book) {
  books.push(book);
  console.log(`Book "${book}" added to the library.`);
}
addBook("The Lord of the Rings");
addBook("Rich Dad and Poor dad");

function removeBook(book) {
  let index = books.indexOf(book);
  if (index >= -1) {
    books.splice(index, 1);
    console.log(`${book} removed from library`);
  } else {
    console.log(`${book} not found in library`);
  }
}
// removeBook("The Lord of the Rings");

function searchBook(book) {
  let found = books.includes(book);
  console.log(found ? "Book found is in the Libraray" : "Not found the book");
}
// searchBook("The Lord of the Rings");

function findFirstOccurrence(book) {
  const index = books.indexOf(book);
  if (index !== -1) {
    console.log(`The first occurrence of "${book}" is at index ${index}.`);
  } else {
    console.log(`"${book}" not found in the library.`);
  }
}

// Find the last occurrence of a book
function findLastOccurrence(book) {
  const index = books.lastIndexOf(book);
  if (index !== -1) {
    console.log(`The last occurrence of "${book}" is at index ${index}.`);
  } else {
    console.log(`"${book}" not found in the library.`);
  }
}

function sortBooks() {
  books.sort((a, b) => a.localeCompare(b));
  console.log(books);
}
// sortBooks();

function replaceBook(index, newBook) {
  if (index >= 0 && index < books.length) {
    books.splice(index, 1, newBook);
    displayBooks();
  } else {
    console.log(`Invalid index: ${index}`);
  }
}

function joinBooks() {
  const bookString = books.join(", ");
  console.log(`Books in the library: ${bookString}`);
}

joinBooks();
