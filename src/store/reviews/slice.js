import { createSlice } from "@reduxjs/toolkit";
import { addReview, getReviews } from "./actions";

const initialState = {
  addedReview: "",
  reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addReview.fulfilled, (state, action) => {
        state.addedReview = action.payload;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        const newReview = action.payload[0];
        const exists = state.reviews.some(
          (review) => review.id === newReview.id
        );

        if (!exists) {
          state.reviews.push(newReview);
        }
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
