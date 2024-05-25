const express = require("express");
const UserModel = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");

//Login
const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name });

  if (user && (await user.matchPassword(password))) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    res.json(response);
  } else {
    throw new Error("Invalid UserName or Password");
  }
});

//Registrations
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check for  fields
  if (!name || !email || !password) {
    res.sendStatus(400);
    throw new Error("All necesssary input fields have not filled");
  }

  //pre-existing user
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    throw new Error("User already Exists");
  }

  //userName already Taken
  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    throw new Error("User already Exists");
  }

  // create an entry in the db
  const user = await UserModel.create({ name, email, password });
  if (user) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    res.json(response);
  } else {
    throw new Error("Registration Failed");
  }
});

module.exports = { loginController, registerController };
