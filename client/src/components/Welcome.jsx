/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import logo from "../assets/logo.png";

function Welcome() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  // console.log(user);

  return (
    <div className="welcome-container">
      <img src={logo} alt="Logo" className="welcome-logo" />
      <p>Hey!!! {user.name} </p>
      <p>View and text directly to people in present in the chat rooms</p>
    </div>
  );
}

export default Welcome;
