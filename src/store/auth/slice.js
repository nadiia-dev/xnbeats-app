import { createSlice } from "@reduxjs/toolkit";
import {
  autoSignIn,
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
} from "./actions";

const initialState = {
  isAuth: false,
  user: null,
  checkingAuth: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.checkingAuth = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.checkingAuth = true;
        state.user = action.payload;
      })
      .addCase(autoSignIn.pending, (state) => {
        state.isAuth = false;
        state.loading = true;
      })
      .addCase(autoSignIn.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(autoSignIn.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
});

export const authReducer = authSlice.reducer;
