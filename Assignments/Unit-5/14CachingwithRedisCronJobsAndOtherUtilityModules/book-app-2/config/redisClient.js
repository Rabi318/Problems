const { createClient } = require("redis");
require("dotenv").config();

const client = createClient({
  url: process.env.REDIS_URL,
});

client.connect().catch(console.error);

module.exports = client;
