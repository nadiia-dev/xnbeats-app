import { createSlice } from "@reduxjs/toolkit";
import { addMessage, getMessages } from "./actions";

const initialState = {
  sentMessage: null,
  messages: [],
};

const messagesSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addMessage.fulfilled, (state, action) => {
        state.sentMessage = action.payload;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        const messages = action.payload;
        messages.forEach((newMessage) => {
          const exists = state.messages.some(
            (review) => review.id === newMessage.id
          );

          if (!exists) {
            state.messages.push(newMessage);
          }
        });
      });
  },
});

export const messagesReducer = messagesSlice.reducer;
