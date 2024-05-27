/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import axios from "axios";
import { myContext } from "./MainContainer";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { refresh, setRefresh } = useContext(myContext);
  const [conversations, setConversations] = useState([]);

  if (!userData) {
    console.log("Not auth");
    navigate(-1);
  }

  const user = userData;
  const self_id = user._id;
  console.log("self", self_id);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get("http://localhost:4000/chat/", config).then((response) => {
      console.log("Data", response.data);
      setConversations(response.data);
    });
    console.log("con", conversations);
  }, [refresh]);

  const logOutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <div className="sb-header">
        <div>
          <IconButton onClick={() => navigate("/app/welcome")}>
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
        {conversations.map((conversation, index) => {
          if (conversation.users.length == 1) {
            return <div key={index}></div>;
          }
          if (conversation.lastMessage == undefined) {
            return (
              <div
                key={index}
                onClick={() => {
                  console.log("refresh fired from sidebar ");
                  setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    console.log("clked");
                    self_id == conversation.users[0]._id
                      ? navigate(
                          `chat/${conversation._id}&${conversation.users[1].name}`
                        )
                      : navigate(
                          `chat/${conversation._id}&${conversation.users[0].name}`
                        );
                  }}
                >
                  <p className="con-icon">
                    {self_id == conversation.users[0]._id
                      ? conversation.users[1].name[0]
                      : conversation.users[0].name[0]}
                  </p>
                  <p className="con-title">
                    {self_id == conversation.users[0]._id
                      ? conversation.users[1].name
                      : conversation.users[0].name}
                  </p>

                  <p className="con-lastMessage">
                    No previous Messages, click here to start a new chat
                  </p>
                  {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="conversation-container"
                onClick={() => {
                  self_id == conversation.users[0]._id
                    ? navigate(
                        `chat/${conversation._id}&${conversation.users[1].name}`
                      )
                    : navigate(
                        `chat/${conversation._id}&${conversation.users[0].name}`
                      );
                }}
              >
                <p className="con-icon">
                  {self_id == conversation.users[0]._id
                    ? conversation.users[1].name[0]
                    : conversation.users[0].name[0]}
                </p>
                <p className="con-title">
                  {self_id == conversation.users[0]._id
                    ? conversation.users[1].name
                    : conversation.users[0].name}
                </p>

                <p className="con-lastMessage">
                  {conversation.lastMessage.content}
                </p>
                {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Sidebar;
