import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addImageToReview,
  addReviewToDatabase,
  fetchPostsFromDatabase,
  getAllReviewsFromDatabase,
  getReviewFromDatabase,
  updateReviewInDatabase,
} from "../../api";

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
  async ({ reviewId, imageUrl }, { rejectWithValue }) => {
    try {
      const review = await addImageToReview(reviewId, imageUrl);
      return review;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getReviews = createAsyncThunk(
  "reviews/getAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const reviews = await getAllReviewsFromDatabase();
      return reviews;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getReviewById = createAsyncThunk(
  "reviews/getReviewById",
  async (id, { rejectWithValue }) => {
    try {
      const reviews = await getReviewFromDatabase(id);
      return reviews;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const reviews = await updateReviewInDatabase(id, reviewData);
      return reviews;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "reviews/getRatedReviews",
  async ({ limit, where }, { rejectWithValue }) => {
    try {
      const reviews = await fetchPostsFromDatabase(limit, where);
      return reviews;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
