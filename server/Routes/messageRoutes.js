const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../Controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

// router.route("/:chatId").get(allMessages);
// router.route("/").post(sendMessage);
Router.get("/:chatId", allMessages);
Router.post("/", sendMessage);

module.exports = Router;
