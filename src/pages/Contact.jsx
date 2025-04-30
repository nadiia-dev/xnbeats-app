import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/messages/actions";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addMessage(data));
    toast.success("Congrats your message has been sent successfully!", {
      position: "bottom-right",
    });
    reset();
  };
  return (
    <Box my={5}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography mb={3} variant="h3" component="p">
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "70%" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            padding={3}
          >
            <>
              <FormLabel>Name</FormLabel>
              <TextField
                fullWidth
                name="name"
                type="name"
                required
                margin="normal"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}
            </>
            <>
              <FormLabel>Email</FormLabel>
              <TextField
                fullWidth
                name="email"
                type="email"
                required
                margin="normal"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
            </>
            <>
              <FormLabel>Message</FormLabel>
              <TextField
                fullWidth
                name="message"
                multiline
                rows={4}
                required
                margin="normal"
                {...register("message", {
                  required: true,
                })}
              />
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
            </>
            <Button sx={{ mt: 2 }} type="submit" variant="contained">
              Send message
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Contact;
