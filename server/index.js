const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// app.get("/", (req, res) => {
//   res.send(`Server is Running on ${PORT}`);
// });

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
const connectDb = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);
    console.log("Server is Connected to DB");
  } catch (error) {
    console.log("Server is NOT connected to DB", error.message);
  }
};

connectDb();

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const { Socket } = require("socket.io");

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

//Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server is running on ${PORT}.....`)
);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`⚡️ ${socket.id} user just connected`);
  socket.on("disconned", () => {
    console.log("A user disconnected");
  });

  socket.on("setup", (user) => {
    socket.join(user._id);
    console.log("joind");
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    console.log("room", room);
    socket.join(room);
  });

  socket.on("new message", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.user is not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageStatus.sender._id) return;

      socket.in(user._id).emit("message recieved", messageRecieved);
    });
  });
});
