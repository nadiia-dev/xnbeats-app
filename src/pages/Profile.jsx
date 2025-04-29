import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/auth/selectors";
import ConfirmModal from "../components/ConfirmModal";
import { updateUser } from "../store/auth/actions";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [disabled, setDisabled] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modalState, setModalState] = useState({
    open: false,
    formData: "",
  });
  const handleReAuth = (data) => {
    setModalState({
      open: true,
      formData: data,
    });
  };

  const handleClose = () => {
    setModalState({ open: false, formData: "" });
  };

  const submitForm = (data) => {
    setDisabled(true);
    setModalState({ open: false, formData: "" });

    dispatch(updateUser({ userData: { uid: user.uid, ...data } })).then(() =>
      toast.success("Congrats your profile has been updated!", {
        position: "bottom-right",
      })
    );
  };
  return (
    <DashboardLayout title="Profile">
      <Box maxWidth="md" mx="auto" mb={4} direction="column">
        <form onSubmit={handleSubmit(handleReAuth)}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item size={6}>
                  <TextField
                    fullWidth
                    label="First name"
                    name="name"
                    defaultValue={user.name}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}
                </Grid>
                <Grid item size={6}>
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    defaultValue={user.lastName}
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <span className="text-danger">This field is required</span>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Email"
                name="email"
                defaultValue={user.email}
                disabled
                {...register("email", {
                  required: true,
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
              />
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Address"
                name="address"
                defaultValue={user.address}
                {...register("address")}
              />
            </Grid>

            <Grid item>
              <Grid container spacing={2}>
                <Grid item size={4}>
                  <TextField
                    select
                    fullWidth
                    label="What are you?"
                    name="gender"
                    defaultValue={user.gender}
                    {...register("gender")}
                  >
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item size={4}>
                  <TextField
                    select
                    fullWidth
                    label="DAW"
                    name="daw"
                    defaultValue={user.daw}
                    {...register("daw")}
                  >
                    <MenuItem value="Bitwig">Bitwig</MenuItem>
                    <MenuItem value="FL Studio">FL Studio</MenuItem>
                    <MenuItem value="Ableton">Ableton</MenuItem>
                  </TextField>
                </Grid>
                <Grid item size={4}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    defaultValue={user.age}
                    {...register("age")}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                size="large"
                disabled={disabled}
              >
                Update profile
              </Button>
            </Grid>
          </Grid>
        </form>
        <ConfirmModal
          modalState={modalState}
          handleClose={handleClose}
          submitForm={handleSubmit((data) => submitForm(data))}
        />
      </Box>
    </DashboardLayout>
  );
};

export default Profile;
