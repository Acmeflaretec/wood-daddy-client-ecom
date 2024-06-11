 
import React, { useState,useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import './index.css';

function LoginPage() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    try {
      const response = await axiosInstance.post('http://localhost:5000/api/v1/auth/login', formData);
      console.log(response.data)
      localStorage.setItem(
        "Tokens",
        JSON.stringify({ access: response.data.data.token.accessToken, refresh: response.data.data.token.refreshToken })
      );
      // Store tokens if provided in the response
      // localStorage.setItem('Tokens', response.data.data.accessToken);
      // localStorage.setItem('refreshToken', response.data.data.refreshToken);

      // Navigate to the home page or another route
      navigate(`/`);
    } catch (error) {
      // Handle error response
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="authmain">
      <Container component="main" maxWidth="xs">
        <Box
          className="login-container"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <div className="login-header">
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
          </div>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mail"
              label="Email Address"
              name="mail"
              autoComplete="mail"
              autoFocus
              value={formData.mail}
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
            {errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}
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

