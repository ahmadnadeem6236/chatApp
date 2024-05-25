/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "users/signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const params = {
        name: username,
        email: email,
        password: password,
      };
      let link = "http://localhost:4000/user/register";
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

export const SignUpSlice = createSlice({
  name: "signup",
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
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        (state.loading = false),
          (state.success = true),
          (state.userInfo = payload);
      })
      .addCase(signupUser.pending, (state, { payload }) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload);
      });
  },
});

export const { clearAllState } = SignUpSlice.actions;

export const signupSelector = (state) => state.signup;
