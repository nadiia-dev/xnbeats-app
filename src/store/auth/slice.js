import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./actions";

const initialState = {
  isAuth: false,
  user: null,
  checkingAuth: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        // state.checkingAuth = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.checkingAuth = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        // state.checkingAuth = false;
        state.error = action.payload;
      }),
});

export const authReducer = authSlice.reducer;
