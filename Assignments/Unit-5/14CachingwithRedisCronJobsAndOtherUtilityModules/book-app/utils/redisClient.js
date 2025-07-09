const { createClient } = require("redis");
const client = createClient();

client.on("error", (err) => console.log("Redis Error:", err));
client.connect();

module.exports = client;
