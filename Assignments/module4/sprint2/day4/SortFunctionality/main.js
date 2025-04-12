const url = "https://jsonplaceholder.typicode.com/users";
const userList = document.querySelector(".user-list");
const sortSelect = document.getElementById("sort");

let users = [];
async function fetchUsers() {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      userList.innerHTML = "<p>Error fetching users</p>";
      return;
    }
    const data = await res.json();
    users = data;
    displayUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    userList.innerHTML = "<p>Error fetching users</p>";
  }
}

function displayUsers(users) {
  userList.innerHTML = ""; // Clear previous users
  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
    <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
   `;
    userList.appendChild(card);
  });
}
sortSelect.addEventListener("change", () => {
  console.log("Sort by:", sortSelect.value);
  const sortBy = sortSelect.value;
  if (!sortBy) {
    displayUsers(users);
    return;
  } else {
    const sorted = [...users].sort((a, b) => {
      const aValue = a[sortBy]?.toLowerCase?.() || "";
      const bValue = b[sortBy]?.toLowerCase?.() || "";
      return aValue.localeCompare(bValue);
    });
    console.log("Sorted data preview:", sorted.slice(0, 3));
    displayUsers(sorted);
  }
});
fetchUsers();
