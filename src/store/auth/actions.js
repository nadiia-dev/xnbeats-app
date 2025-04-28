import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserInDatabase } from "../../api/index";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await createUserInDatabase(userData);
      console.log(user);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
