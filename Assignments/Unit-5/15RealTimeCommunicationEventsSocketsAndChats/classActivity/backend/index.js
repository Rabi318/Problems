const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cors());

//creating the first connection event

const userDetails = {};
let chatHistory = [];
io.on("connection", (client) => {
  console.log("Client connected:", client.id);

  client.on("registerUser", (userName) => {
    userDetails[client.id] = userName;
    console.log("User registered:", userName);
  });
  client.on("sendMessage", (message) => {
    console.log("Message received:", message);
    client.emit("welcome", "elcome to the chat!");
    let chatObj = {
      from: userDetails[client.id],
      message: message,
      time: new Date().toLocaleTimeString(),
    };
    chatHistory.push(chatObj);
    client.emit("chat_history", chatHistory);
    // console.log(chatObj);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
