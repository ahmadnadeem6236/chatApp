/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./myStyles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ConversationItems from "./ConversationItems";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([
    {
      name: "Test#1",
      lastMessage: "Last Message #1",
      timeStamp: "today",
    },
    {
      name: "Test#2",
      lastMessage: "Last Message #1",
      timeStamp: "today",
    },
    {
      name: "Test#3",
      lastMessage: "Last Message #1",
      timeStamp: "today",
    },
  ]);

  const logOutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <div className="sb-header">
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={() => {
              navigate("users");
            }}
            className="icon"
          >
            <PersonAddIcon />
          </IconButton>

          <IconButton onClick={() => navigate("groups")}>
            <GroupAddIcon />
          </IconButton>

          <IconButton onClick={() => navigate("create-groups")}>
            <AddCircleIcon />
          </IconButton>
          {/* Added LogOut button */}
          <IconButton onClick={logOutHandler}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="search" className="search-box" />
      </div>

      <div className="sb-conversations">
        {conversations.map((conversation) => {
          return (
            <ConversationItems props={conversation} key={conversation.name} />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
