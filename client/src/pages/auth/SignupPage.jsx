 

// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import './index.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function SignupPage() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
//         firstName: formData.username,
//         lastName: formData.lastName,
//         password: formData.password,
//         phone: formData.phone,
//         mail: formData.email
//       });
  
//       if (response.data.proceed) {
//         navigate('/login');
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       setError('An error occurred during signup');
//     }
//   };
  

//   return (
//     <div className='authmain'>
//       <Container component="main" maxWidth="xs">
//         <Box
//           className="login-container"
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//         >
//           <div className="login-header">
//             <Typography component="h1" variant="h5">
//               Sign up
//             </Typography>
//           </div>
//           <form noValidate onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="User Name"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={formData.username}
//               onChange={handleChange}
//             />
//            <TextField
//   variant="outlined"
//   margin="normal"
//   required
//   fullWidth
//   id="lastName"
//   label="Last Name"
//   name="lastName"
//   autoComplete="lname"
//   autoFocus
//   value={formData.lastName}
//   onChange={handleChange}
// />
// <TextField
//   variant="outlined"
//   margin="normal"
//   required
//   fullWidth
//   id="phone"
//   label="Phone Number"
//   name="phone"
//   autoComplete="phone"
//   value={formData.phone}
//   onChange={handleChange}
// />

//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               value={formData.email}
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
//             {error && <Typography color="error">{error}</Typography>}
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//           </form>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default SignupPage;

import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, createTheme, ThemeProvider } from '@mui/material';
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

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    lastName: '',
    phone: '',
    mail: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    try {
      const response = await axiosInstance.post('http://localhost:5000/api/v1/auth/register', {
        firstName: formData.username,
        lastName: formData.lastName,
        phone: formData.phone,
        mail: formData.mail,
        password: formData.password,
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="First Name"
                name="username"
                autoComplete="fname"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formData.lastName}
                onChange={handleChange}
              />
              <TextField
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
                margin="normal"
                required
                fullWidth
                id="mail"
                label="Email Address"
                name="mail"
                autoComplete="email"
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
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
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

