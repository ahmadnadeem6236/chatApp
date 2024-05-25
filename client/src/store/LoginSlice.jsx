/* eslint-disable no-unused-vars */
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
      let link = "http://localhost:4000/user/login";
      const response = await axios.post(link, params, {
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.data;
      if (response.status == 200) {
        localStorage.setItem("token", data.token);
        return data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearAllState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        (state.loading = false),
          (state.success = true),
          (state.userInfo = payload);
      })
      .addCase(loginUser.pending, (state, { payload }) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload);
      });
  },
});
export const { clearAllState } = LoginSlice.actions;

export const loginSelector = (state) => state.login;
