import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth/actions";

const Login = () => {
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isRegister) {
      dispatch(registerUser(formData));
    }
  };

  return (
    <Box margin="auto" sx={{ width: { sm: "70%", lg: "40%" } }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" padding={5} margin="auto">
          <Typography padding={1} variant="h4" textAlign="center">
            {isRegister ? "Register" : "Login"}
          </Typography>
          {isRegister && (
            <>
              <FormLabel>Name</FormLabel>
              <TextField
                onChange={handleChange}
                value={formData.name}
                name="name"
                type="name"
                required
                margin="normal"
              />
              <FormLabel>Last Name</FormLabel>
              <TextField
                onChange={handleChange}
                value={formData.lastName}
                name="lastName"
                type="lastName"
                required
                margin="normal"
              />
            </>
          )}
          <FormLabel>Email</FormLabel>
          <TextField
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            required
            margin="normal"
          />
          <FormLabel>Password</FormLabel>
          <TextField
            onChange={handleChange}
            value={formData.password}
            name="password"
            type="password"
            required
            margin="normal"
          />
          <Button sx={{ mt: 2 }} type="submit" variant="contained">
            {isRegister ? "Register" : "Login"}
          </Button>
          <div className="mt-3">
            {isRegister ? "Already have an account?" : "Don`t have an account?"}{" "}
            <span>
              Click{" "}
              <button
                className="form-btn btn btn-link p-0 mb-1"
                onClick={() => setIsRegister((prevState) => !prevState)}
              >
                here
              </button>{" "}
              to
            </span>{" "}
            {isRegister ? "login" : "register"}
          </div>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
