import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  autoSignInDatabase,
  createUserInDatabase,
  loginUserInDatabase,
} from "../../api/index";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await createUserInDatabase(userData);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await loginUserInDatabase(userData);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const autoSignIn = createAsyncThunk(
  "auth/refreshUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await autoSignInDatabase();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
