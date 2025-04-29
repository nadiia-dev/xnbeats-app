import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  autoSignInDatabase,
  createUserInDatabase,
  loginUserInDatabase,
  logoutUserFromDatabse,
  updateUserProfile,
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

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserFromDatabse();
      return { message: "You successfully logged out" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateProfile",
  async ({ userData }, { rejectWithValue }) => {
    try {
      const user = await updateUserProfile(userData);
      return user;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
