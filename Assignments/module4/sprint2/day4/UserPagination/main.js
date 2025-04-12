const userList = document.querySelector("#user-list");
const pagination = document.querySelector("#pagination");
const usersPerPage = 5;
const totalUsers = 10;
const totalPages = Math.ceil(totalUsers / usersPerPage);
async function fetchUsers(page = 1) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${usersPerPage}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    dispalyUsers(data);
  } catch (error) {
    console.log(error);
    userList.innerHTML = `<p style="color:red">Error fetching users</p>`;
  }
}
function dispalyUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const div = document.createElement("div");
    div.className = "user-card";
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <p>${user.phone}</p>
    `;
    userList.appendChild(div);
  });
}
function createPagination() {
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "page-btn";
    btn.addEventListener("click", () => {
      fetchUsers(i);
    });
    pagination.appendChild(btn);
  }
}
fetchUsers();
createPagination();
