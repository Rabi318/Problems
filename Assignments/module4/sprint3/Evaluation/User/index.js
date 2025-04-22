const tableBody = document.querySelector("#userTable tbody");
const searchInput = document.getElementById("search");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

const rowsPerPage = 5;

let users = [];
let filteredUsers = [];
let currentPage = 1;
let currentSortKey = null;
let sortAsc = true;

//Fetch data
async function fetchUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await res.json();
    filteredUsers = [...users];

    displayTable();
    displayPagination();
  } catch (error) {
    console.log(error);
  }
}

function displayTable() {
  const start = (currentPage - 1) * rowsPerPage;
  const paginated = filteredUsers.slice(start, start + rowsPerPage);

  tableBody.innerHTML = "";
  paginated.forEach((user) => {
    const row = `
    <tr>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.address.city}</td>
    <td>${user.company.name}</td>
    </tr>
    `;
    tableBody.innerHTML += row;
  });
  displayPagination();
}
function displayPagination() {
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  pageInfo.textContent = `Page ${currentPage} `;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayTable();
  }
});
nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayTable();
  }
});
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );
  currentPage = 1;
  displayTable();
});

document.querySelectorAll("th").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.getAttribute("data-key");
    if (currentSortKey === key) {
      sortAsc = !sortAsc;
    } else {
      currentSortKey = key;
      sortAsc = true;
    }
    filteredUsers.sort((a, b) => {
      let valA, valB;
      if (key === "name") {
        valA = a.name;
        valB = b.name;
      } else if (key === "email") {
        valA = a.email;
        valB = b.email;
      } else if (key === "address.city") {
        valA = a.address.name;
        valB = b.address.name;
      } else if (key === "company.name") {
        valA = a.company.name;
        valB = b.company.name;
      }
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    displayTable();
  });
});

fetchUsers();
