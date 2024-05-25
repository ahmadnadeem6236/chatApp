/* eslint-disable react-refresh/only-export-components */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const params = {
        name: username,
        password: password,
      };
      console.log(params);
      let link = "http://localhost:4000/user/login";
      const response = await axios.post(link, params, {
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.data;
      // console.log(data);
      if (response.status == 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log("Error >", error.response.data);
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    name: "",
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    addName: (state, actions) => {
      state.name = actions.payload;
      localStorage.setItem("name", state.name);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isFetching = false;
        state.isSuccess = true;
        state.name = payload.name;
        return state;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState, addName } = LoginSlice.actions;
export const loginSlector = (state) => state.login;
