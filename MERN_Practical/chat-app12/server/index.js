const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Attach Socket.io to the HTTP server, allow the React dev server's origin
const io = new Server(server, {
  cors: {
    origin: "*", // in production, restrict this to your client's domain
    methods: ["GET", "POST"],
  },
});

// In-memory store of connected users: { socketId: username }
const connectedUsers = new Map();

app.get("/", (req, res) => {
  res.send("Chat server is running.");
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Client tells server which username they joined with
  socket.on("join", (username) => {
    connectedUsers.set(socket.id, username);

    // Notify everyone that a new user joined
    io.emit("user_joined", {
      username,
      message: `${username} joined the chat`,
      users: Array.from(connectedUsers.values()),
    });
  });

  // Broadcast a chat message to everyone (including sender for confirmation)
  socket.on("send_message", (data) => {
    // data = { username, text, time }
    io.emit("receive_message", data);
  });

  // Typing indicator - broadcast to everyone except the sender
  socket.on("typing", (username) => {
    socket.broadcast.emit("display_typing", username);
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("hide_typing");
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const username = connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);

    if (username) {
      io.emit("user_left", {
        username,
        message: `${username} left the chat`,
        users: Array.from(connectedUsers.values()),
      });
    }
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
