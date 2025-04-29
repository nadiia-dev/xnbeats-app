import { createSlice } from "@reduxjs/toolkit";
import { addReview } from "./actions";

const initialState = {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
    });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
