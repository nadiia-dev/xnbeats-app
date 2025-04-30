import { createAsyncThunk } from "@reduxjs/toolkit";
import { addMessageToDatabase, getAllMessagessFromDatabase } from "../../api";

export const addMessage = createAsyncThunk(
  "messages/addMessage",
  async (data, { rejectWithValue }) => {
    try {
      const message = await addMessageToDatabase(data);
      return message;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async (_, { rejectWithValue }) => {
    try {
      const messages = await getAllMessagessFromDatabase();
      return messages;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
