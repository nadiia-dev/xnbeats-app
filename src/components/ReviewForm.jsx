import {
  Box,
  Button,
  FormLabel,
  MenuItem,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required("The title is required"),
    excerpt: yup.string().required("You must add an excerpt"),
    rating: yup.number().required("The rating too"),
    public: yup.string().required("Is it public or a draft ?"),
  })
  .required();

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onAddReview = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onAddReview)}>
        <Box display="flex" flexDirection="column" gap={2} padding={3}>
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
            />
            {errors.excerpt && (
              <span className="text-danger">{errors.excerpt?.message}</span>
            )}
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
          <button
            // sx={{ mt: 2, width: 150 }}
            type="submit"
            // variant="contained"
          >
            Submit
          </button>
        </Box>
      </form>
    </>
  );
};

export default ReviewForm;

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup
//   .object({
//     firstName: yup.string().required(),
//     age: yup.number().positive().integer().required(),
//   })
//   .required();

// export default function ReviewForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const onSubmit = (data) => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstName")} />
//       <p>{errors.firstName?.message}</p>

//       <input {...register("age")} />
//       <p>{errors.age?.message}</p>

//       <input type="submit" />
//     </form>
//   );
// }
