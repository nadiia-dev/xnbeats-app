import { createAsyncThunk } from "@reduxjs/toolkit";
import { addReviewToDatabase } from "../../api";

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
