import "easymde/dist/easymde.min.css";
import {
  Box,
  Button,
  FormLabel,
  MenuItem,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SimpleMdeReact from "react-simplemde-editor";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/auth/selectors";
import { addReview } from "../store/reviews/actions";
import { toast } from "react-toastify";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import { getReviewFromDatabase } from "../api";

const schema = yup
  .object({
    title: yup.string().required("The title is required"),
    content: yup.string().required("You must add an content"),
    excerpt: yup.string().required("You must add an excerpt"),
    rating: yup.number().required("The rating too"),
    public: yup.string().required("Is it public or a draft ?"),
  })
  .required();

const ReviewForm = ({ id }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [curReview, setCurReview] = useState();
  const defaultValues = {
    title: "",
    excerpt: "",
    content: "",
    rating: "",
    public: "",
  };
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    const getReview = async (id) => {
      const review = await getReviewFromDatabase(id);
      if (review) {
        reset({
          title: review.title || "",
          excerpt: review.excerpt || "",
          content: review.content || "",
          rating: review.rating || "",
          public: review.public || "",
        });
        setCurReview(review);
      }
    };
    if (id) {
      getReview(id);
    }
  }, [id, reset]);

  const onReview = (data) => {
    console.log(data);
    if (!curReview) {
      dispatch(addReview({ data, user }));
    } else {
      // dispatch(editReview({ data, user }));
    }
    reset();
    toast.success("Congrats your post has been saved successfully!", {
      position: "bottom-left",
    });
  };

  // console.log(curReview);

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <Box flex={3}>
        <form onSubmit={handleSubmit(onReview)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <>
              <FormLabel>Title</FormLabel>
              <TextField
                fullWidth
                name="title"
                type="title"
                required
                {...register("title")}
              />
              {errors.title && (
                <span className="text-danger">{errors.title?.message}</span>
              )}
            </>
            <>
              <FormLabel>Excerpt</FormLabel>
              <TextareaAutosize
                minRows={3}
                name="excerpt"
                {...register("excerpt")}
                className="w-100"
              />
              {errors.excerpt && (
                <span className="text-danger">{errors.excerpt?.message}</span>
              )}
            </>
            <>
              <FormLabel>Content</FormLabel>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <SimpleMdeReact placeholder="Enter smth" {...field} />
                )}
              />
            </>
            <>
              <FormLabel>Rating</FormLabel>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <TextField select fullWidth label="Choose..." {...field}>
                    <MenuItem value="1">1 star</MenuItem>
                    <MenuItem value="2">2 stars</MenuItem>
                    <MenuItem value="3">3 stars</MenuItem>
                    <MenuItem value="4">4 stars</MenuItem>
                    <MenuItem value="5">5 stars</MenuItem>
                  </TextField>
                )}
              />
              {errors.rating && (
                <span className="text-danger">{errors.rating?.message}</span>
              )}
            </>
            <>
              <FormLabel>Public</FormLabel>
              <Controller
                name="public"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField select fullWidth label="Choose..." {...field}>
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                    </TextField>
                  </>
                )}
              />
              {errors.public && (
                <span className="text-danger">{errors.public?.message}</span>
              )}
            </>
            <Button
              sx={{ mt: 2, width: 150 }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <Box display="flex" flex={2} mt={3}>
        <ImageUploader
          img={curReview ? curReview.imageUrl : "https://placehold.co/400"}
        />
      </Box>
    </Box>
  );
};

export default ReviewForm;
