const BASE_URL =
  "https://librarydb-1f0c8-default-rtdb.asia-southeast1.firebasedatabase.app/";

const allBooks = [];
let currentPages = 1;
let itemsPerPage = 5;
async function fetchBooks() {
  try {
    const res = await fetch(`${BASE_URL}/books.json`);
    if (!res.ok) {
      console.log("Error fetching books:", res.statusText);
      return;
    }
    const data = await res.json();
    let moviesArray = Object.entries(data).map(([id, book]) => ({
      id,
      ...book,
    }));
    // console.log(moviesArray);
    allBooks.length = 0;
    allBooks.push(...moviesArray);
    renderBooks(moviesArray);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}
fetchBooks();
function renderBooks(books) {
  let bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  books.forEach((book) => {
    let bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author} (${book.publishedYear})</p>
      <p>${book.genre} | ${book.available ? "Available" : "Unavailable"}</p>
      <button class="delete-btn" onclick="deleteBook('${
        book.id
      }')">Delete</button>
    `;
    bookList.appendChild(bookCard);
  });
}
// renderBooks();

async function applyBookFilters() {
  let titleFilter = document
    .getElementById("bookTitleFilter")
    .value.toLowerCase();
  let authorFilter = document
    .getElementById("bookAuthorFilter")
    .value.toLowerCase();
  let genreFilter = document
    .getElementById("bookGenreFilter")
    .value.toLowerCase();

  let availableFilter = document.getElementById("bookAvailableFilter").value;

  itemsPerPage =
    parseInt(document.getElementById("bookItemsPerPage").value) || 5;

  let filteredBooks = allBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(titleFilter) &&
      book.author.toLowerCase().includes(authorFilter) &&
      book.genre.toLowerCase().includes(genreFilter) &&
      (availableFilter === "" ||
        (availableFilter === "true" && book.available) ||
        (availableFilter === "false" && !book.available))
    );
  });
  let startIndex = (currentPages - 1) * itemsPerPage;
  let paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  renderBooks(paginatedBooks);
}
function nextBookPage() {
  currentPages++;
  applyBookFilters();
}
function prevBookPage() {
  if (currentPages > 1) {
    currentPages--;
  }
  applyBookFilters();
}
async function deleteBook(id) {
  try {
    const res = await fetch(`${BASE_URL}/books/${id}.json`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.log("Error deleting book:", res.statusText);
      return;
    }
    fetchBooks();
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}
