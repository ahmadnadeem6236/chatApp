import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./LoginSlice";
import { SignUpSlice } from "./SignUpSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice.reducer,
    signup: SignUpSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
