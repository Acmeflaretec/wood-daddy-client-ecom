import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import './index.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server or perform validation
    console.log('Form data submitted:', formData);
  };

  return (

    <div className='authmain'>
  <Container component="main" maxWidth="xs">
      <Box
        className="login-container"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <div className="login-header">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>

    </div>
  
  );
}

export default LoginPage;
