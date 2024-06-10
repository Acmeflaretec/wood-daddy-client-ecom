 

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import './index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        firstName: formData.username,
        lastName: formData.lastName,
        password: formData.password,
        phone: formData.phone,
        mail: formData.email
      });
  
      if (response.data.proceed) {
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup');
    }
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
              Sign up
            </Typography>
          </div>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
           <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="lastName"
  label="Last Name"
  name="lastName"
  autoComplete="lname"
  autoFocus
  value={formData.lastName}
  onChange={handleChange}
/>
<TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="phone"
  label="Phone Number"
  name="phone"
  autoComplete="phone"
  value={formData.phone}
  onChange={handleChange}
/>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default SignupPage;

