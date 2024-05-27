const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
  addSelfToGroup,
} = require("../Controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

// router.route("/").post(accessChat);
// router.route("/").get(fetchChats);
// router.route("/createGroup").post(createGroupChat);
// router.route("/fetchGroups").get(fetchGroups);
// router.route("/groupExit").put(groupExit);
// router.route("/addSelfToGroup").put(addSelfToGroup);

Router.post("/", protect, accessChat);
Router.get("/", protect, fetchChats);
Router.post("/createGroup", protect, createGroupChat);
Router.get("/fetchGroups", protect, fetchGroups);
Router.put("/groupExit", protect, groupExit);
Router.put("/addSelfToGroup", protect, addSelfToGroup);

module.exports = Router;
