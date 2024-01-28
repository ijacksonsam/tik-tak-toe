const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const PORT = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (message, callback) => {
    console.log(message);
    callback();
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
