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
  checkingAuth: true,
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
        state.checkingAuth = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.checkingAuth = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.checkingAuth = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.checkingAuth = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.checkingAuth = false;
      })

      .addCase(autoSignIn.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(autoSignIn.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.checkingAuth = false;
      })
      .addCase(autoSignIn.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
        state.checkingAuth = false;
      }),
});

export const authReducer = authSlice.reducer;
