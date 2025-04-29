import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { reviewsReducer } from "./reviews/slice";

const store = configureStore({
  reducer: {
    authReducer,
    reviewsReducer,
  },
});

export default store;
