import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cron from "node-cron";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import { Socket } from "dgram";

const { PORT, ADMIN_NAME } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map();
const inMemoryMessages = [];

function makeMessage({ from, content, type = "user" }) {
  return {
    _id: nanoid(),
    from,
    content,
    type,
    timestamp: new Date().toISOString(),
  };
}

function emitOnlineUsers() {
  const users = Array.from(onlineUsers.values()).map((u) => ({
    name: u.name,
    isAdmin: u.isAdmin,
  }));
  io.emit("onlineUsers", users);
}

io.on("connection", (socket) => {
  let registered = false;
  let user = { name: null, isAdmin: false };

  socket.on("register", async ({ name }) => {
    if (!name || typeof name !== "string") {
      socket.emit("errorMessage", "Name is required to join the chat.");
      return;
    }
    user = {
      name: name.trim(),
      isAdmin: name.trim() === ADMIN_NAME,
    };
    onlineUsers.set(socket.id, user);
    registered = true;
    const sysMsg = makeMessage({
      from: "system",
      content: `${user.name} joined`,
      type: "system",
    });
    inMemoryMessages.push(sysMsg);
    // await pushToRedis(sysMsg);
    io.emit("message", sysMsg);

    emitOnlineUsers();
  });
  socket.on("chatMessage", async (content) => {
    if (!registered) {
      socket.emit("errorMessage", "Please register before sending messages.");
      return;
    }
    if (!content || typeof content !== "string") return;

    const msg = makeMessage({ from: user.name, content, type: "user" });
    inMemoryMessages.push(msg);
    // await pushToRedis(msg);
    io.emit("message", msg);
  });
  socket.on("adminBroadcast", async (content) => {
    if (!registered) {
      socket.emit("errorMessage", "Please register before sending messages.");
      return;
    }
    if (!user.isAdmin) {
      socket.emit("errorMessage", "Only admin can send broadcast messages.");
      return;
    }
    if (!content || typeof content !== "string") return;

    const msg = makeMessage({ from: user.name, content, type: "admin" });
    inMemoryMessages.push(msg);
    // await pushToRedis(msg);
    io.emit("message", msg);
  });
  socket.on("disconnectManual", () => {
    socket.disconnect(true);
  });
  socket.on("disconnect", async () => {
    if (registered) {
      const u = onlineUsers.get(socket.id);
      onlineUsers.delete(socket.id);
      emitOnlineUsers();

      const sysMsg = makeMessage({
        from: "system",
        content: `${u?.name ?? "A user"} left`,
        type: "system",
      });
      inMemoryMessages.push(sysMsg);
      // await pushToRedis(sysMsg);
      io.emit("message", sysMsg);
    }
  });
  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });
});
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
