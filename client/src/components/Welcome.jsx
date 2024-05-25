/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { loginSlector } from "../store/LoginSlice";

function Welcome() {
  const name = localStorage.getItem("name");
  return (
    <div className="welcome-container">
      <img src={logo} alt="Logo" className="welcome-logo" />
      <p>Hey!!! {name} </p>
      <p>View and text directly to people in present in the chat rooms</p>
    </div>
  );
}

export default Welcome;
