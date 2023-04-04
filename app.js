require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const mongoString = process.env.DATABASE_KEY;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log({ error });
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected");
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userId: id,
      username: socket.username
    })
  }

  socket.emit("users", users);

  //notify existing users
  socket.broadcast.emit("user connected", {
    userId: socket.id,
    username: socket.username
  })

  // Handle socket events here
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on("message", (message) => {
    console.log("Received Message: ", message);
    io.emit("message", message)
  })
});
app.use(express.json());

app.use("/api", routes);

server.listen(5000, () => {
  console.log("Server started at 5000");
});

// app.listen(5000, () => {
//   console.log("Server started at 5000");
// });
