let users = [];

function addUser(user) {
  const user = { id, name, isAdmin };
  users.push(user);
  return user;
}

function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);
  return index !== -1 ? users.splice(index, 1)[0] : null;
}

function getUsers() {
  return users;
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = { addUser, removeUser, getUsers, getUser };
