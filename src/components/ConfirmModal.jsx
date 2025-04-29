import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { reAuthUser } from "../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const ConfirmModal = ({ modalState, handleClose, submitForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const handleReAuth = async (data) => {
    try {
      await reAuthUser(data);
      submitForm(modalState.formData);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Modal open={modalState.open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Reauntenticate
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(handleReAuth)}>
          <Box display="flex" flexDirection="column" padding={3}>
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
              <FormLabel>Password</FormLabel>
              <TextField
                fullWidth
                name="password"
                type="password"
                required
                margin="normal"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
            </>
            <span className="text-danger">{error}</span>
            <Button sx={{ mt: 2 }} type="submit" variant="contained">
              Reauthenticate
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
