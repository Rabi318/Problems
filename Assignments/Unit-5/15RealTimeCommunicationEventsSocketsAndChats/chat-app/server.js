const express = require("express");
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const corn = require("node-cron");
const redis = require("redis");
const connectDB = require("./config/db");
const { addUser, removeUser, getUsers, getUser } = require("./utils/users");
const { Chat } = require("./chatData/chatBackup");

const app = express();
connectDB();

const redisClient = redis.createClient();
redisClient.connect();

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

let chatMessages = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("register", async ({ name, isAdmin }) => {
    const user = addUser(socket.id, name, isAdmin);
    io.emit("updateUsers", getUsers());
    socket.emit("chatHistory", await redisClient.lRange("chat", -50, -1));
    io.emit("notification", `${name} has joined the chat`);
  });

  socket.on("chatMessage", (msg) => {
    const user = getUser(socket.id);
    if (!user) return;
    const fullMsg = `${user.name}: ${msg}`;
    chatMessages.push(fullMsg);
    redisClient.rPush("chat", fullMsg);
    io.emit("message", fullMsg);
  });

  socket.on("adminMessage", (msg) => {
    const user = getUser(socket.id);
    if (user?.isAdmin) {
      const adminMsg = `🛑 Admin (${user.name}): ${msg}`;
      redisClient.rPush("chat", adminMsg);
      io.emit("message", adminMsg);
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.emit("notification", `${user.name} has left`);
      io.emit("updateUsers", getUsers());
    }
  });
});

cron.schedule("* * * * *", async () => {
  const messages = await redisClient.lRange("chat", 0, -1);
  if (messages.length > 0) {
    const chatDoc = new Chat({ messages, createdAt: new Date() });
    await chatDoc.save();
    console.log("[Backup] Chat history saved to MongoDB");
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
