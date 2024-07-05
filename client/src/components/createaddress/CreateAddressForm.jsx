import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Box, Container, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
}));

export default function CreateAddressForm() {
  const [usersId, setUsersId] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    mobile: '',
    primary: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/getuser`);
        setUsersId(response.data.data[0]._id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const requiredFields = ['firstname', 'lastname', 'address_line_1', 'city', 'state', 'zip', 'country', 'mobile'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `Please fill out the ${field.replace('_', ' ')} field.`;
      }
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/v1/address/address/${usersId}`, formData);
      console.log('Address saved successfully:', response.data);
      setError('');
    } catch (error) {
      console.error('Error saving address:', error);
      setError('Failed to save address. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Create Address
        </Typography>
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="firstname">First name</FormLabel>
              <OutlinedInput
                id="firstname"
                name="firstname"
                type="text"
                placeholder="John"
                autoComplete="given-name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="lastname">Last name</FormLabel>
              <OutlinedInput
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Snow"
                autoComplete="family-name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormLabel htmlFor="address_line_1">Address line 1</FormLabel>
              <OutlinedInput
                id="address_line_1"
                name="address_line_1"
                type="text"
                placeholder="Street name and number"
                autoComplete="address-line1"
                value={formData.address_line_1}
                onChange={handleChange}
                required
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormLabel htmlFor="address_line_2">Address line 2</FormLabel>
              <OutlinedInput
                id="address_line_2"
                name="address_line_2"
                type="text"
                placeholder="Apartment, suite, unit, etc."
                autoComplete="address-line2"
                value={formData.address_line_2}
                onChange={handleChange}
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormLabel htmlFor="mobile">Phone</FormLabel>
              <OutlinedInput
                id="mobile"
                name="mobile"
                type="text"
                placeholder="Mobile"
                autoComplete="tel"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="city">City</FormLabel>
              <OutlinedInput
                id="city"
                name="city"
                type="text"
                placeholder="New York"
                autoComplete="address-level2"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="state">State</FormLabel>
              <OutlinedInput
                id="state"
                name="state"
                type="text"
                placeholder="NY"
                autoComplete="address-level1"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="zip">Zip / Postal code</FormLabel>
              <OutlinedInput
                id="zip"
                name="zip"
                type="text"
                placeholder="12345"
                autoComplete="postal-code"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="country">Country</FormLabel>
              <OutlinedInput
                id="country"
                name="country"
                type="text"
                placeholder="United States"
                autoComplete="country-name"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </FormGrid>
          </Grid>
          <Box display="flex" justifyContent="center" pt={2}>
            <Button variant="contained" type="submit">Save</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
