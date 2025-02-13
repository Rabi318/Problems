function getAccess(user) {
  return user.role === "admin"
    ? user.active
      ? "Admin Acess Granted!"
      : "Admin Acess Revoked"
    : user.role === "user"
    ? user.active
      ? "User Acess Granted!"
      : "User Acess Revoked"
    : "Access Denied";
}

let user = { name: "Alice", role: "admin", active: false };
console.log(getAccess(user));
let user2 = { name: "Bob", role: "user", active: true };
console.log(getAccess(user2));
