/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from "react";
import "./myStyles.css";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import Welcome from "./Welcome";
import CreateGroups from "./CreateGroups";
import Users_Groups from "./Users";
import Users from "./Users";
import Groups from "./Groups";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

export const myContext = createContext();
function MainContainer() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);

  return (
    <div className="main-container">
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar />
        {localStorage.getItem("token") ? (
          <Outlet />
        ) : (
          <Navigate to={"/"} replace />
        )}
        {/* <CreateGroups /> */}
        {/* <Welcome /> */}
        {/* <ChatArea props={conversations[0]} /> */}
        {/* <Users /> */}
        {/* <Groups /> */}
      </myContext.Provider>
    </div>
  );
}

export default MainContainer;
