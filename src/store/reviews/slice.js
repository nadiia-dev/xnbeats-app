import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
});

export const reviewsReducer = reviewsSlice.reducer;
