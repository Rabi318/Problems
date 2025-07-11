const EventEmitter = require("events");

const eventEmitter = new EventEmitter();
const user = { name: "Alice" };

eventEmitter.on("userLoggedIn", (user) => {
  console.log(`> User ${user.name} logged in`);
  eventEmitter.emit("sendNotification", user);
  eventEmitter.emit("syncData", user);
});

eventEmitter.on("sendNotification", (user) => {
  console.log(`> Notification sent to ${user.name}`);
});

eventEmitter.on("syncData", (user) => {
  console.log(`> Syncing user data...`);
  // Simulate async operation
  setTimeout(() => {
    eventEmitter.emit("dataSynced", user);
  }, 2000);
});

eventEmitter.on("dataSynced", (user) => {
  console.log(`> Data sync complete`);
});

eventEmitter.on("userLoggedIn", (user) => {
  console.log(
    `> [Log] ${user.name} logged in at ${new Date().toLocaleTimeString()}`
  );
});

setTimeout(() => {
  eventEmitter.emit("userLoggedIn", user);
}, 1000);
