import { createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  getPosts,
  getReviewById,
  getReviews,
  updateReview,
} from "./actions";

const initialState = {
  reviewId: null,
  curReview: "",
  reviews: [],
  posts: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviewId = action.payload;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        const reviews = action.payload;
        reviews.forEach((newReview) => {
          const exists = state.reviews.some(
            (review) => review.id === newReview.id
          );

          if (!exists) {
            state.reviews.push(newReview);
          }
        });
      })
      .addCase(getReviewById.fulfilled, (state, action) => {
        state.reviewId = action.payload.id;
        state.curReview = action.payload;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const newReview = action.payload;
        state.curReview = action.payload;
        const index = state.reviews.findIndex(
          (review) => review.id === newReview.id
        );

        if (index !== -1) {
          state.reviews[index] = newReview;
        }
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const reviews = action.payload;
        reviews.forEach((newReview) => {
          const exists = state.reviews.some(
            (review) => review.id === newReview.id
          );

          if (!exists) {
            state.posts.push(newReview);
          }
        });
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
