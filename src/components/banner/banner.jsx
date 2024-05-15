


import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useSwipeable } from 'react-swipeable'; 

const slides = [
  {
    heading: 'Quality Wood Furniture',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget gravida ex, in iaculis enim. Cras et sodales lorem.',
    imageUrl: '/gallery/b1.jpg', 
  },
  {
    heading: 'Elegant Designs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget gravida ex, in iaculis enim. Cras et sodales lorem.',
    imageUrl: '/gallery/b2.jpg', 
  },
  {
    heading: 'Customizable Options',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget gravida ex, in iaculis enim. Cras et sodales lorem.',
    imageUrl: '/gallery/b1.jpg', 
  },
];

function Banner() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = slides.length;

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
  }, []);

  return (
    <Paper
      square
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        bgcolor: 'background.default',
      }}
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', zIndex: 1 }}>
         <Typography variant="h4">{slides[activeStep].heading}</Typography>
         <Typography variant="body1">{slides[activeStep].description}</Typography>
       </div>
       <Button
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 5,
          color: 'white',
        }}
        size="small"
        onClick={handleBack}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: 5,
          color: 'white',
        }}
        size="small"
        onClick={handleNext}
      >
        <KeyboardArrowRight />
      </Button>
      <div {...useSwipeable({ onSwipedLeft: handleNext, onSwipedRight: handleBack })}>
        {slides.map((slide, index) => (
          <div key={index} style={{ display: index === activeStep ? 'block' : 'none' }}>
            <img
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </Paper>
  );
}

export default Banner;
