/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllState,
  signupSelector,
  signupUser,
} from "../store/SignUpSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, userInfo, error, success } = useSelector(signupSelector);

  const usernameChangeHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const emailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(signupUser({ username, email, password }));
  };

  useEffect(() => {
    if (success) {
      localStorage.setItem("user", userInfo.name);
      dispatch(clearAllState());
      navigate("/app/welcome");
    }
  }, [navigate, success, dispatch]);

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="Logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <p className="login-text">Create your Account</p>
        <TextField
          onChange={usernameChangeHandler}
          id="standard-basic-username"
          label="Enter User Name"
          variant="outlined"
          autoComplete="current-username"
        />
        <TextField
          onChange={emailChangeHandler}
          id="standard-basic-email"
          label="Enter Email Address"
          variant="outlined"
          autoComplete="current-email"
        />
        <TextField
          onChange={passwordChangeHandler}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined" onClick={onSubmit}>
          SIGN UP
        </Button>
        <div className="login-btn-container">
          <p>Already have an Account ?</p>
          <Button onClick={() => navigate("/")}>Login</Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
