const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

dotenv.config();
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

app.get("/", (req, res) => {
  res.send("API is running without any restart");
});

app.use("/user", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log("Server is running....."));
