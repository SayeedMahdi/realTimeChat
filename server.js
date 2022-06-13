const express = require("express");
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");

//making app module
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//middle wares
app.use(express.static("./public"));

io.on("connection", (socket) => {
  
  socket.emit("message", "welcome to appCord Chat");
  socket.broadcast.emit("message", "mahdi joined to chat");
  socket.on("new_message" , msg=>{
    io.emit("message",msg)
  });
  socket.on("disconnect", () => {
    io.emit("message", "Some user disconnected");
  });
  
});

const port = process.env.PORT || 3000;
server.listen(port, console.log("server started in port 3000"));
