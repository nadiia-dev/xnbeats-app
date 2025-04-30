import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { reviewsReducer } from "./reviews/slice";
import { messagesReducer } from "./messages/slice";

const store = configureStore({
  reducer: {
    authReducer,
    reviewsReducer,
    messagesReducer,
  },
});

export default store;
