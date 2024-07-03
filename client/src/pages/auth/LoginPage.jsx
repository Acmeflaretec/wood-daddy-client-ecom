 
// import React, { useState,useEffect } from 'react';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../axios';
// import './index.css';

// function LoginPage() {
//   const navigate = useNavigate();


//   const [formData, setFormData] = useState({
//     mail: '',
//     password: '',
//   });

//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(''); // Clear any previous error messages
//     try {
//       const response = await axiosInstance.post('http://localhost:5000/api/v1/auth/login', formData);
//       console.log(response.data)
//       localStorage.setItem(
//         "Tokens",
//         JSON.stringify({ access: response.data.data.token.accessToken, refresh: response.data.data.token.refreshToken })
//       );
//       // Store tokens if provided in the response
//       // localStorage.setItem('Tokens', response.data.data.accessToken);
//       // localStorage.setItem('refreshToken', response.data.data.refreshToken);

//       // Navigate to the home page or another route
//       navigate(`/`);
//     } catch (error) {
//       // Handle error response
//       if (error.response) {
//         setErrorMessage(error.response.data.message || 'Login failed');
//       } else {
//         setErrorMessage('An error occurred. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="authmain">
//       <Container component="main" maxWidth="xs">
//         <Box
//           className="login-container"
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//         >
//           <div className="login-header">
//             <Typography component="h1" variant="h5">
//               Log in
//             </Typography>
//           </div>
//           <form noValidate onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="mail"
//               label="Email Address"
//               name="mail"
//               autoComplete="mail"
//               autoFocus
//               value={formData.mail}
//               onChange={handleChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             {errorMessage && (
//               <Typography color="error" variant="body2">
//                 {errorMessage}
//               </Typography>
//             )}
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//           </form>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default LoginPage;



import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginPage() {
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
      localStorage.setItem(
        "Tokens",
        JSON.stringify({ access: response.data.data.token.accessToken, refresh: response.data.data.token.refreshToken })
      );

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
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/gallery/a1.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
