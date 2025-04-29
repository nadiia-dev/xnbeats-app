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

const schema = yup
  .object({
    title: yup.string().required("The title is required"),
    content: yup.string().required("You must add an content"),
    excerpt: yup.string().required("You must add an excerpt"),
    rating: yup.number().required("The rating too"),
    public: yup.string().required("Is it public or a draft ?"),
  })
  .required();

const ReviewForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onAddReview = (data) => {
    console.log(data);
    dispatch(addReview({ data, user }));
    reset();
    toast.success("Congrats your post has been saved successfully!", {
      position: "bottom-left",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onAddReview)}>
        <Box display="flex" flexDirection="row" gap={2} padding={3}>
          <Box flex={3} display="flex" flexDirection="column" gap={2}>
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
              <TextField
                select
                fullWidth
                label="Choose..."
                name="rating"
                {...register("rating")}
              >
                <MenuItem value="1">1 star</MenuItem>
                <MenuItem value="2">2 stars</MenuItem>
                <MenuItem value="3">3 stars</MenuItem>
                <MenuItem value="4">4 stars</MenuItem>
                <MenuItem value="5">5 stars</MenuItem>
              </TextField>
              {errors.rating && (
                <span className="text-danger">{errors.rating?.message}</span>
              )}
            </>
            <>
              <FormLabel>Public</FormLabel>
              <TextField
                select
                fullWidth
                label="Choose..."
                name="public"
                {...register("public")}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </TextField>
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
        </Box>
      </form>
      <Box flex={1} mt={3}>
        <ImageUploader img="https://placehold.co/400" />
      </Box>
    </>
  );
};

export default ReviewForm;
