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

const createdRooms = [];
const joinedRooms = [];

function removeRoomFromCreatedAndJoined(roomNo) {
  const index = createdRooms.indexOf(roomNo);
  if (index > -1) {
    createdRooms.splice(index, 1);
  }
  const index2 = joinedRooms.indexOf(roomNo);
  if (index2 > -1) {
    joinedRooms.splice(index2, 1);
  }
}

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (message, callback) => {
    console.log(message);
    callback();
  });
  socket.on("disconnect", () => {
    // removeRoomFromCreatedAndJoined(roomNoVal);
    // socket.leave(roomNoVal);
    console.log("user disconnected from room");
  });
  socket.on("create-room", (roomNo, callback) => {
    if (createdRooms.includes(roomNo)) {
      callback({ status: "error", message: "room already exists" });
    } else {
      createdRooms.push(roomNo);
      callback({
        status: "success",
        message: `room${roomNo} created successfully`,
      });
      // console.log(`room ${roomNo} created`);
      socket.join(roomNo);
    }
  });
  socket.on("join-room", (roomNo, callback) => {
    if (joinedRooms.includes(roomNo)) {
      callback({ status: "error", message: "room already exists" });
    } else if (!createdRooms.includes(roomNo)) {
      callback({ status: "error", message: `room ${roomNo} does not exist` });
    } else {
      joinedRooms.push(roomNo);
      callback({
        status: "success",
        message: `room${roomNo} joined successfully`,
      });
      // console.log(`room ${roomNo} joined`);
      socket.join(roomNo);
    }
  });

  socket.on("move", ({ row, col, playerNo, roomNoVal }) => {
    socket.to(roomNoVal).emit("move", { row, col, playerNo });
  });
});

server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
