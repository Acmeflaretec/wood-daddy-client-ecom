import React, { useState,useEffect } from 'react';
import {
  TextField, Button, Box, Container, Typography, List, ListItem,
  ListItemText, ListItemSecondaryAction, IconButton, Checkbox,
  Paper, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import axiosInstance from '../../axios';

const Address = () => {
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', address_line_1: '', address_line_2: '',
    city: '', state: '', zip: '', country: '', mobile: '', 
  });

  const [addresses, setAddresses] = useState([]);
  const [addressesData,setAddressesData] = useState([])
  const [editingIndex, setEditingIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

// getting ADDRESSES
const fetchAddress = async()=>{
try {
  const response = await axiosInstance.get(`/api/v1/address/getaddresses`)
  setAddressesData(response.data)
  console.log('add',response.data)
} catch (error) {
  
}

}

useEffect(()=>{
  fetchAddress()
},[])



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    console.log('form',{
      ...formData,
      [name]: value,
    })
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
await axiosInstance.post(`/api/v1/address/address`,formData)
 await fetchAddress()

    if (editingIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = formData;
      setAddresses(updatedAddresses);
      setEditingIndex(null);
    } else {
      setAddresses([...addresses, formData]);
    }
    setFormData({
      firstname: '', lastname: '', address_line_1: '', address_line_2: '',
      city: '', state: '', zip: '', country: '', mobile: '', 
    });
    setOpenDialog(false);
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleDelete =async (index,addressId) => {
    await axiosInstance.delete(`/api/v1/address/${addressId}`)
    if(addressesData.length>1){
      await fetchAddress()

    }else{

      window.location.reload()
    }

    // const updatedAddresses = addresses.filter((_, i) => i !== index);
    // setAddresses(updatedAddresses);
  };
  const handleDefault = async(addressId)=>{

    await axiosInstance.put(`/api/v1/address/setdefault/${addressId}`)
    await fetchAddress()

  }

  const handleOpenDialog = () => {
    setEditingIndex(null);
    setFormData({
      firstname: '', lastname: '', address_line_1: '', address_line_2: '',
      city: '', state: '', zip: '', country: '', mobile: '', primary: false,
    });
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom color="primary">
          <HomeIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Address 
        </Typography>

        {addressesData.length > 0 ? (
          <List>
            {addressesData.map((address, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          {`${address.firstname} ${address.lastname}`}
                          {address.primary && <Typography component="span" color="primary" sx={{ ml: 1 }}>(default)</Typography>}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {`${address.address_line_1}, ${address.address_line_2 ? address.address_line_2 + ', ' : ''}${address.city}, ${address.state}, ${address.zip}, ${address.country}`}
                          <br />
                          {`Mobile: ${address.mobile}`}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                  

         {!address.primary ==true ?   (<Button
              variant="contained"
              color="success"
             
            
              onClick={()=>handleDefault(address._id)}
            >
              default
            </Button>) : ('')}
 
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index,address._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </CardContent>
              </Card>
            ))}
          </List>
        ) : (
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No addresses saved yet
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Add New Address
            </Button>
          </Paper>
        )}

        {addressesData.length > 0 && (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Add New Address
            </Button>
          </Box>
        )}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingIndex !== null ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="firstname" label="First Name" value={formData.firstname} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="lastname" label="Last Name" value={formData.lastname} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField name="address_line_1" label="Address Line 1" value={formData.address_line_1} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField name="address_line_2" label="Address Line 2" value={formData.address_line_2} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="city" label="City" value={formData.city} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="state" label="State" value={formData.state} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="zip" label="Zip Code" value={formData.zip} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="country" label="Country" value={formData.country} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField name="mobile" label="Mobile" value={formData.mobile} onChange={handleChange} fullWidth required />
              </Grid>
              {/* <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Checkbox name="primary" checked={formData.primary} onChange={handleChange} />
                  <Typography>Set as Primary Address</Typography>
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingIndex !== null ? 'Update Address' : 'Save Address'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Address;