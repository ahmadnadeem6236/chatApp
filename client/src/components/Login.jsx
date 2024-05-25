/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector, loginUser, clearAllState } from "../store/LoginSlice";
import { Email, Password } from "@mui/icons-material";
import Toaster from "./Toaster";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, userInfo, error, success } = useSelector(loginSelector);

  const usernameChangeHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
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
        <p className="login-text">Login to your Account</p>
        <TextField
          id="standard-basic"
          onChange={usernameChangeHandler}
          label="Username"
          variant="outlined"
        />
        <TextField
          onChange={passwordChangeHandler}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="outlined" onClick={onSubmit}>
            Login
          </Button>
        )}
        <div className="login-btn-container">
          <p>Don&apos;t have an Account ?</p>
          <Button onClick={() => navigate("sign-up")}>Sign Up</Button>
        </div>
      </div>
      {error ? <Toaster message={"Invalid Credentials"} /> : ""}
    </div>
  );
}

export default Login;
