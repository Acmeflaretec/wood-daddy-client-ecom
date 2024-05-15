import React from 'react';
import './index.css';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate  } from 'react-router-dom';

function ProductCard(props) {
const {type} = props

  const [activeIndex, setActiveIndex] = React.useState(0);

  const images = [
    '/gallery/products/p1.jpg',
    '/gallery/products/p1.jpg',
    '/gallery/products/p1.jpg',
    // Add more image URLs as needed
  ];

  const navigate = useNavigate();

  const handleSwipeChange = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleBack = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleCardClick = () => {
    // Navigate to /product route
    navigate('/product');
  };

  return (
    <Box className="product-card">
      <Box className="image-container"  >
        <SwipeableViews index={activeIndex} onChangeIndex={handleSwipeChange}>
          {images.map((imageUrl, index) => (
            <Box key={index} className="image">
              <img src={imageUrl} alt={`Image ${index + 1}`} onClick={handleCardClick}/>
            </Box>
          ))}
        </SwipeableViews>
        <div className='nav-button'>
        <IconButton className=" prev" onClick={handleBack}>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton className="  next" onClick={handleNext}>
          <KeyboardArrowRight />
        </IconButton>
        </div>
      
      </Box>
      <CardContent>
        <Typography variant="h5" component="div">
          Furniture Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description of the furniture goes here. You can provide additional details about the product.
        </Typography>
        <p className='warning'>Hurry up! only 3 left</p>
      <div>
        <p > <span style={{fontSize:'22px'}} >Rs 10000</span> <span style={{color:'gray',fontSize:'18px',textDecoration:'line-through'
      ,marginLeft:'10px'}}>15000</span> <span style={{color:'green',marginLeft:'10px',fontSize:'22px'}}>25% off</span></p>
      </div>
      <p style={{color:'green'}}>Hot Deal</p>
      

      </CardContent>
      <Box className="actions">
        <button className="action-button add-to-cart">Add to Cart</button>
       {type!=='wishlist' && <button className="action-button wishlist">Wishlist</button>}
      </Box>
    </Box>
  );
}

export default ProductCard;
