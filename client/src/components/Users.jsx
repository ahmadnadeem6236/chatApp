/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./myStyles.css";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { refreshSidebarFun } from "../store/refreshSidebar";
import { myContext } from "./MainContainer";

function Users() {
  const { refresh, setRefresh } = useContext(myContext);

  const userData = JSON.parse(localStorage.getItem("user"));

  const [listUsers, setListUsers] = useState([]);
  const dispatch = useDispatch();

  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav(-1);
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    let link = "http://localhost:4000/user/fetchUsers";
    axios.get(link, config).then((res) => {
      setListUsers(res.data);
    });
  }, [refresh]);

  return (
    <div className="list-container">
      <div className="ug-header">
        <img src={logo} alt="Logo" style={{ height: "2rem", width: "2rem" }} />
        <p className="ug-title">Available Users</p>
      </div>
      <IconButton
        className="icon"
        onClick={() => {
          setRefresh(!refresh);
        }}
      >
        <RefreshIcon />
      </IconButton>
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="search" className="search-box" />
      </div>
      <div className="ug-list">
        {listUsers.map((user, index) => {
          return (
            <div
              className="list-tem"
              key={index}
              onClick={() => {
                console.log("Creating chat with", user.name);
                const config = {
                  headers: {
                    Authorization: `Bearer ${userData.token}`,
                  },
                };
                axios.post(
                  "http://localhost:4000/chat/",
                  {
                    userId: user._id,
                  },
                  config
                );
                dispatch(refreshSidebarFun());
              }}
            >
              <p className="con-icon">{user.name[0]}</p>
              <p className="con-title">{user.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
