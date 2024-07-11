import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSwipeable } from "react-swipeable";
import axiosInstance from "../../axios";
import { Box } from "@mui/material";

function Banner() {
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/banner`);
        setBanners(response?.data?.data);
        setMaxSteps(response?.data?.data?.length);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
    );
  };

  const autoPlayInterval = 3000;

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => {
      clearInterval(timer);
    };
  }, [activeStep, autoPlayInterval]);

  useEffect(() => {
    if (isNaN(activeStep)) {
      setActiveStep(0);
    }
  }, [activeStep]);

  return (
    <Box
      square
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: {
          xs: "calc(100vw * 9 / 16)",
          sm: "calc(100vw * 9 / 16)",
          md: "calc(100vw * 9 / 16)",
          lg: "calc(100vw * 9 / 16)",
          xl: "calc(100vw * 9 / 16)",
        },
        bgcolor: "background.default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 1,
        }}
      >
        <Typography variant="h4" fontSize={{ xs: 16, sm: 28, md: 36, lg: 44 }}>
          {banners[activeStep]?.title}
        </Typography>
        <Typography
          variant="body1"
          fontSize={{ xs: 10, sm: 12, md: 16, lg: 18 }}
        >
          {banners[activeStep]?.subtitle}
        </Typography>
      </div>
      <Button
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 5,
          color: "white",
        }}
        size="small"
        onClick={handleBack}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <Button
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: 5,
          color: "white",
        }}
        size="small"
        onClick={handleNext}
      >
        <KeyboardArrowRightIcon />
      </Button>
      <div
        {...useSwipeable({
          onSwipedLeft: handleNext,
          onSwipedRight: handleBack,
        })}
      >
        {banners.map((slide, index) => (
          <div
            key={index}
            style={{ display: index === activeStep ? "block" : "none" }}
          >
            <img
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={`${process.env.REACT_APP_API_URL}/uploads/${slide.image}`}
              alt={`Slide ${index + 1}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/gallery/b1.jpg";
              }}
            />
          </div>
        ))}
      </div>
    </Box>
  );
}

export default Banner;
