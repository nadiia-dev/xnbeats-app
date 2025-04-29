import { createSlice } from "@reduxjs/toolkit";
import { addReview } from "./actions";

const initialState = {
  addedReview: "",
  reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.addedReview = action.payload;
    });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
