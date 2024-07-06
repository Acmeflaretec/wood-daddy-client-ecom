import React, { useState, useEffect } from 'react';
import {
  Box, Card, Stack, Typography, Divider, FormControl, FormLabel, Input,
  AspectRatio, Breadcrumbs, Link, Button, CircularProgress, Alert
} from '@mui/joy';
import { HomeRounded, ChevronRightRounded, EmailRounded, PhoneAndroidRounded } from '@mui/icons-material';
import axiosInstance from '../../axios';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/getuser`);
        setUser(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert color="danger">{error}</Alert>
      </Box>
    );
  }

  return (
    <>

      <Box sx={{ flex: 1, width: '100%', bgcolor: 'background.surface' }}>
      

        <Card sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          <Typography level="title-lg" sx={{ mb: 2 }}>Personal Information</Typography>
          <Divider />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ my: 3 }}>
            <AspectRatio ratio="1" sx={{ width: { xs: 120, md: 180 }, borderRadius: '50%', mx: { xs: 'auto', md: 0 } }}>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt="Profile"
              />
            </AspectRatio>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>First Name</FormLabel>
                  <Input value={user?.firstName || ''} readOnly />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Last Name</FormLabel>
                  <Input value={user?.lastName || ''} readOnly />
                </FormControl>
              </Stack>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  startDecorator={<EmailRounded />}
                  value={user?.mail || ''}
                  readOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  startDecorator={<PhoneAndroidRounded />}
                  value={user?.phone || ''}
                  readOnly
                />
              </FormControl>
            </Stack>
          </Stack>

        </Card>
      </Box>
     
    </>
  );
}

export default Profile;