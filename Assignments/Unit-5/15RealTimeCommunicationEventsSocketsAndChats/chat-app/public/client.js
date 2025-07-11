const socket = io();

function register() {
  const name = document.getElementById("name").value;
  const isAdmin = document.getElementById("isAdmin").checked;
  if (!name) return alert("Enter name");

  socket.emit("register", { name, isAdmin });

  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "block";
  document.getElementById("adminMsg").style.display = isAdmin
    ? "block"
    : "none";
}

function sendMessage() {
  const msg = document.getElementById("messageInput").value;
  socket.emit("chatMessage", msg);
  document.getElementById("messageInput").value = "";
}

function sendAdmin() {
  const msg = document.getElementById("adminInput").value;
  socket.emit("adminMessage", msg);
  document.getElementById("adminInput").value = "";
}

function disconnect() {
  socket.disconnect();
}

socket.on("message", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  document.getElementById("messages").appendChild(div);
});

socket.on("notification", (msg) => {
  const div = document.createElement("div");
  div.textContent = `🔔 ${msg}`;
  div.style.fontStyle = "italic";
  document.getElementById("messages").appendChild(div);
});

socket.on("chatHistory", (messages) => {
  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.textContent = msg;
    document.getElementById("messages").appendChild(div);
  });
});

socket.on("updateUsers", (users) => {
  const usersDiv = document.getElementById("users");
  usersDiv.innerHTML =
    "<h4>Online Users:</h4>" +
    users
      .map((u) => `<div>${u.name}${u.isAdmin ? " (admin)" : ""}</div>`)
      .join("");
});
