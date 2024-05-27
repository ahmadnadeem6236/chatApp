/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import "./myStyles.css";
import { IconButton, Skeleton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MessageSelf from "./MessageSelf";
import MessageOther from "./MessageOther";
import axios from "axios";
import { useParams } from "react-router-dom";
import { myContext } from "./MainContainer";
import { io, Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
var socket, chat;
// eslint-disable-next-line react/prop-types
function ChatArea() {
  const [messageContent, setMessageContent] = useState("");
  const messageEndRef = useRef(null);
  let dyParams = useParams();
  console.log(dyParams);
  const [chat_id, chat_user] = dyParams.id.split("&");
  console.log("chatid", chat_id);
  console.log("chatu", chat_user);

  const userData = JSON.parse(localStorage.getItem("user"));
  const [allMessage, setAllMessage] = useState([]);
  console.log("uD", userData);
  const [loaded, setLoaded] = useState(false);
  const { refresh, setRefresh } = useContext(myContext);
  const [allMessageCopy, setAllMessageCopy] = useState([]);

  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);

  const user = userData;

  const sendMessage = () => {
    try {
      const params = {
        content: messageContent,
        chatId: chat_id,
        sender_id: user._id,
      };
      let link = "http://localhost:4000/message/";
      axios
        .post(link, params, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(({ response }) => {
          console.log("msg post", response.data);
          console.log("Msg fired");
          socket.emit("new message", response.data);
        });
    } catch (error) {
      throw new Error("Message not send", error);
    }
  };

  //connect to socket
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
      console.log("s", socketConnectionStatus);
    });
  });

  //new message recieved
  useEffect(() => {
    socket.on("message recieved", (newMessage) => {
      if (!allMessageCopy || allMessageCopy._id !== newMessage._id) {
        /* empty */
      } else {
        return (
          setAllMessage([...allMessage], newMessage),
          () => {
            socket.disconnect();
          }
        );
      }
    });
  });

  //fetch chats
  useEffect(() => {
    console.log("Users Refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("http://localhost:4000/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessage(data);
        setLoaded(true);
        socket.emit("join chat", chat_id);
        console.log("all>", allMessage);
      });
    setAllMessageCopy(allMessage);
  }, [refresh, chat_id, allMessage, user.token]);

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <div className="chatArea-container">
        <div className="chatArea-header">
          <p className="con-icon">{chat_user[0]}</p>
          <div className="header-text">
            <p className="con-title">{chat_user}</p>
            {/* <p className="con-timeStamp">{props.timeStamp}</p> */}
          </div>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="messages-container">
          {allMessage
            .slice(0)
            .reverse()
            .map((message, index) => {
              const sender = message.sender;
              const self_id = userData._id;
              if (sender._id == self_id) {
                return <MessageSelf props={message} key={index} />;
              } else {
                return <MessageOther props={message} key={index} />;
              }
            })}
        </div>
        <div ref={messageEndRef} className="BOTTOM" />
        <div className="text-input-area">
          <input
            placeholder="Type Message"
            className="search-box"
            value={messageContent}
            onChange={(e) => {
              e.preventDefault();
              setRefresh(!refresh);
              setMessageContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                setRefresh(!refresh);
                sendMessage();
                setMessageContent("");
              }
            }}
          />
          <IconButton
            className="icon"
            onClick={(e) => {
              setRefresh(!refresh);
              e.preventDefault();
              sendMessage();
              setMessageContent("");
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default ChatArea;
