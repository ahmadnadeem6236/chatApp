/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./myStyles.css";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import Welcome from "./Welcome";
import CreateGroups from "./CreateGroups";
import Users_Groups from "./Users";
import Users from "./Users";
import Groups from "./Groups";
import { Outlet } from "react-router-dom";

function MainContainer() {
  return (
    <div className="main-container">
      <Sidebar />
      <Outlet />
      {/* <CreateGroups /> */}
      {/* <Welcome /> */}
      {/* <ChatArea props={conversations[0]} /> */}
      {/* <Users /> */}
      {/* <Groups /> */}
    </div>
  );
}

export default MainContainer;
