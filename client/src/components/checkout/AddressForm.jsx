import React,{useState,useEffect} from 'react';
import axiosInstance from '../../axios';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

import { Box,Container, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm({usersProId,addressDetails,primaryAddresses,formData,setFormData}) {
  const [urlQuery, setUrlQuery] = useState('');


  const handleChange = (event) => {
     
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  console.log('form',formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/v1/address/address/${usersProId}`, formData);
      console.log('Address saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };


  return (
   <div>

{ addressDetails?(
  
  <div>
   <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Primary Address Details
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1"><strong>First Name:</strong> {primaryAddresses.firstname}</Typography>
          <Typography variant="subtitle1"><strong>Last Name:</strong> {primaryAddresses.lastname}</Typography>
          <Typography variant="subtitle1"><strong>Mobile:</strong> {primaryAddresses.mobile}</Typography>
          <Typography variant="subtitle1"><strong>Address Line 1:</strong> {primaryAddresses.address_line_1}</Typography>
          <Typography variant="subtitle1"><strong>Address Line 2:</strong> {primaryAddresses.address_line_2}</Typography>
          <Typography variant="subtitle1"><strong>City:</strong> {primaryAddresses.city}</Typography>
          <Typography variant="subtitle1"><strong>State:</strong> {primaryAddresses.state}</Typography>
          <Typography variant="subtitle1"><strong>ZIP:</strong> {primaryAddresses.zip}</Typography>
          <Typography variant="subtitle1"><strong>Country:</strong> {primaryAddresses.country}</Typography>
          <Typography variant="subtitle1"><strong>Created At:</strong> {new Date(primaryAddresses.createdAt).toLocaleString()}</Typography>
          <Typography variant="subtitle1"><strong>Updated At:</strong> {new Date(primaryAddresses.updatedAt).toLocaleString()}</Typography>
        </Box>
      </Paper>
    </Container>
    <div style={{display:'flex',justifyContent:'center',paddingTop:'20px'}} >  <Button variant="contained" onClick={()=>console.log('chng add')} >Change Address</Button></div>

</div>

) :(
   <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="firstname"
          name="firstname"
          type="name"
          placeholder="John"
          autoComplete="first name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="lastname"
          name="lastname"
          type="last-name"
          placeholder="Snow"
          autoComplete="last name"
          value={formData.lastname}
                onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address_line_1"
          name="address_line_1"
          type="address1"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          value={formData.address_line_1}
                onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <OutlinedInput
          id="address_line_2"
          name="address_line_2"
          type="address2"
          placeholder="Apartment, suite, unit, etc. "
          autoComplete="shipping address-line2"
          value={formData.address_line_2}
                onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">phone</FormLabel>
        <OutlinedInput
          id="mobile"
          name="mobile"
          type="mobile"
          placeholder="mobile"
          autoComplete="mobile"
          value={formData.mobile}
                onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="New York"
          autoComplete="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="NY"
          autoComplete="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          value={formData.zip}
                onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
  )}
   </div>
  );
}