import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import './MapAddress.css';

function MapAddress() {
  return (
    <Box className='MapAddress'>
      <Box className='mapContainer'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62651.02061496091!2d76.02719146071638!3d11.06194314978545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64a9be29b058f%3A0x23e371e0d4c30d8e!2sMalappuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1714627543517!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </Box>
      {/* <Paper elevation={3} className='addressContainer'>
        <Typography variant="h5" gutterBottom>
          Our Address
        </Typography>
        <Typography variant="body1">
          123 Beautiful Street, City, Country
        </Typography>
        <Typography variant="body1">
          Phone: +1234567890
        </Typography>
        <Typography variant="body1">
          Email: example@example.com
        </Typography>
      </Paper> */}
    </Box>
  );
}

export default MapAddress;
