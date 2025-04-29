import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    daw: "",
    age: "",
  });
  const handleSubmit = () => {};
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <DashboardLayout title="Profile">
      <Box maxWidth="md" mx="auto" mb={4} direction="column">
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item size={6}>
                  <TextField
                    fullWidth
                    label="First name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item size={6}>
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Row 2: Email */}
            <Grid item>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            {/* Row 3: Address */}
            <Grid item>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>

            {/* Row 4: Gender + DAW + Age */}
            <Grid item>
              <Grid container spacing={2}>
                <Grid item size={4}>
                  <TextField
                    select
                    fullWidth
                    label="What are you?"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
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
                    value={formData.daw}
                    onChange={handleChange}
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
                    value={formData.age}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Submit button row */}
            <Grid item>
              <Button type="submit" fullWidth variant="outlined" size="large">
                Update profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </DashboardLayout>
  );
};

export default Profile;
