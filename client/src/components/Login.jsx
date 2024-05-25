/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSlector,
  loginUser,
  clearState,
  addName,
} from "../store/LoginSlice";
import { Email, Password } from "@mui/icons-material";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { name, isFetching, isSuccess, isError, errorMessage } =
    useSelector(loginSlector);

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
    console.log(username, password);
    dispatch(loginUser({ username, password }));
    dispatch(addName(username));
  };
  // console.log(data);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(isError);
      console.log(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      navigate("/app/welcome");
    }
  }, [isError, isSuccess, errorMessage, dispatch, navigate]);

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
        <Button variant="outlined" onClick={onSubmit}>
          Login
        </Button>
        <div className="login-btn-container">
          <p>Don&apos;t have an Account ?</p>
          <Button onClick={() => navigate("sign-up")}>Sign Up</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
