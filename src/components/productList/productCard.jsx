
import React from 'react';
import './index.css';
import { Box, CardContent, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

function ProductCard(props) {
  const { type,productDetails } = props;

  console.log('pro',productDetails)

  const images = [
    '/gallery/products/p1.jpg',
    '/gallery/products/p12.jpg',
    '/gallery/products/p12.jpg',
    // Add more image URLs as needed
  ];

  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % productDetails.image.length);
  };

  const handleBack = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + productDetails.image.length) % productDetails.image.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
  });

  const handleCardClick = () => {
    // Navigate to /product route
    navigate('/product');
  };

  return (
    <Box className="product-card" {...handlers}>
      <Box className="image">
        <img
          src={`http://localhost:5000/uploads/${productDetails.image[activeIndex]}` }
          alt={`Image ${activeIndex + 1}`}
          onClick={handleCardClick}
        />
        <div className="nav-button">
          <IconButton className="prev" onClick={handleBack}>
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton className="next" onClick={handleNext}>
            <KeyboardArrowRight />
          </IconButton>
        </div>
      </Box>
      <CardContent>
        <Typography variant="h5" component="div">
          {productDetails.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {productDetails.subheading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {productDetails.description}
        </Typography>
        <p className="warning">Hurry up! only 3 left</p>
        <div>
          <p>
            <span style={{ fontSize: '22px' }}>Rs {productDetails.price}</span>
            <span style={{ color: 'gray', fontSize: '18px', textDecoration: 'line-through', marginLeft: '10px' }}>
              {productDetails.sale_rate}
            </span>
            <span style={{ color: 'green', marginLeft: '10px', fontSize: '22px' }}>{productDetails.discount}% off</span>
          </p>
        </div>
        <p style={{ color: 'green' }}>Hot Deal</p>
      </CardContent>
      <Box className="actions">
        <button className="action-button add-to-cart">Add to Cart</button>
        {type !== 'wishlist' && <button className="action-button wishlist">Wishlist</button>}
      </Box>
    </Box>
  );
}

export default ProductCard;

