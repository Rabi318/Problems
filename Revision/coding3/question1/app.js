const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("userLoggedIn", (username) => {
  console.log(`> User ${username} logged in`);
});

emitter.on("userLoggedIn", (username) => {
  console.log(`> Notification sent to ${username}`);
});
emitter.on("messageReceived", (from, message) => {
  console.log(`> Message from ${from}: "${message}"`);
});
emitter.on("dataSyncStart", (username) => {
  console.log(`> Syncing data for ${username}...`);
});
emitter.on("dataSynced", (username) => {
  console.log(`> Data sync complete for ${username}`);
});

function startApp() {
  const username = "John";
  setTimeout(() => {
    emitter.emit("userLoggedIn", username);

    // Simulate receiving a message shortly after login
    setTimeout(() => {
      emitter.emit("messageReceived", "Admin", "Welcome to the system!");

      // Start syncing data
      setTimeout(() => {
        emitter.emit("dataSyncStart", username);

        // Complete sync after another delay
        setTimeout(() => {
          emitter.emit("dataSynced", username);
        }, 1500);
      }, 1000);
    }, 1000);
  }, 500);
}

startApp();
