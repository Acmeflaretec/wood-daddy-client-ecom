import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import Address from '../../components/address/Address';
import ProfileOrder from '../../components/profileOrder/ProfileOrder';
import Profile from './Profile';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function MainProfile() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
         <Header />

     <Container maxWidth="md">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
              <Tab label="Profile" />
              <Tab label="Address" />
              <Tab label="Orders" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Profile />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Address />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProfileOrder />
          </TabPanel>
    
     </Container>
      <Footer/>
    </Box>
  );
}

export default MainProfile;