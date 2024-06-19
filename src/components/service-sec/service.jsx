import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const ServiceBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

function Service() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const serviceRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Change this threshold value based on your requirement
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animationPlayed) {
        setIsVisible(true);
        setAnimationPlayed(true);
      }
    }, options);

    if (serviceRef.current) {
      observer.observe(serviceRef.current);
    }

    return () => {
      if (serviceRef.current) {
        observer.unobserve(serviceRef.current);
      }
    };
  }, [animationPlayed]);

  return (
    <Box id="service" py={8} bgcolor="#f7f7f7" ref={serviceRef}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
        
            <ServiceBox>
              <LocalShippingIcon color="primary" fontSize="large" />
              <Typography variant="h6" mt={2}>Furniture Delivery</Typography>
              <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </ServiceBox>
   
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
         
            <ServiceBox>
              <CheckCircleIcon color="primary" fontSize="large" />
              <Typography variant="h6" mt={2}>Quality products</Typography>
              <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </ServiceBox>
         
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <ServiceBox>
              <SupportAgentIcon color="primary" fontSize="large" />
              <Typography variant="h6" mt={2}>24/7 Support</Typography>
              <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </ServiceBox>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Service;
