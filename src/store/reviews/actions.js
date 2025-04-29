import { createAsyncThunk } from "@reduxjs/toolkit";
import { addImageToReview, addReviewToDatabase } from "../../api";

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ data, user }, { rejectWithValue }) => {
    try {
      const review = await addReviewToDatabase(data, user);
      return review;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateReviewImage = createAsyncThunk(
  "reviews/updateReviewImage",
  async ({ addedReview, imageUrl }, { rejectWithValue }) => {
    try {
      const review = await addImageToReview(addedReview, imageUrl);
      return review;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
