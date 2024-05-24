import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSwipeable } from 'react-swipeable';
import axiosInstance from '../../axios';

function Banner() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/v1/banner');
        setBanners(response.data.data);
        setMaxSteps(response.data.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (banners.length === 0) {
      fetchData();
    }
  }, [banners]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  // Auto play timer interval (milliseconds)
  const autoPlayInterval = 5000; // Change this value to adjust the interval

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => {
      clearInterval(timer);
    };
  }, [activeStep, autoPlayInterval]);

    // Ensure activeStep is within the valid range
    useEffect(() => {
      if (isNaN(activeStep)) {
        setActiveStep(0);  // Set activeStep to 0 if it becomes NaN
      }
    }, [activeStep]);

  return (
    <Paper square elevation={0} sx={{ position: 'relative', overflow: 'hidden', width: '100%', bgcolor: 'background.default' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', zIndex: 1 }}>
        <Typography variant="h4">{banners[activeStep]?.title}</Typography>
        <Typography variant="body1">{banners[activeStep]?.subtitle}</Typography>
        
      </div>
      <Button
        sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 5, color: 'white' }}
        size="small"
        onClick={handleBack}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <Button
        sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 5, color: 'white' }}
        size="small"
        onClick={handleNext}
      >
        <KeyboardArrowRightIcon />
      </Button>
      <div {...useSwipeable({ onSwipedLeft: handleNext, onSwipedRight: handleBack })}>
        {banners.map((slide, index) => (
          <div key={index} style={{ display: index === activeStep ? 'block' : 'none' }}>
            <img
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              src={`http://localhost:5000/uploads/${slide.imgUrl}`}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </Paper>
  );
}

export default Banner;
