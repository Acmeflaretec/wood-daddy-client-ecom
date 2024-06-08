
import React,{useState,useEffect} from 'react';
import './index.css';
import axiosInstance from '../../axios';
import { Box, CardContent, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

function ProductCard(props) {
  const { type,productDetails } = props;
  const [state,setState] = useState(productDetails)
  // console.log('pro details',state)


  const images = [
    '/gallery/products/p1.jpg',
    '/gallery/products/p12.jpg',
    '/gallery/products/p12.jpg',
    // Add more image URLs as needed
  ];

  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % state.image.length);
  };

  const handleBack = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + state.image.length) % state.image.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
  });

  const handleCardClick = () => {
    // Navigate to /product route
    navigate(`/product/${state._id}`);
  };

  const addCart = async(e,proId)=>{

    e.preventDefault()
    // console.log('proid',proId)
      try {
    
        const response = await axiosInstance.post(`http://localhost:5000/api/v1/cart/664db80748eeadcd76759a55/${proId}`);
        setState({ ...state, inCart: true });
        
      } catch (error) {
        console.log('err',error)
      }
      
  
  }
  const removeCart = async(e,proId)=>{
  
    e.preventDefault()
    console.log('proid',proId)
    try {
  
      const response = await axiosInstance.delete(`http://localhost:5000/api/v1/cart/664db80748eeadcd76759a55/${proId}`);
      setState({ ...state, inCart: false });
      
    } catch (error) {
      console.log('err',error)
    }
    
  }
  const addWishlist = async(e,proId)=>{
    e.preventDefault()
  console.log('proid',proId)
    try {
  
      const response = await axiosInstance.post(`http://localhost:5000/api/v1/wishlist/664db80748eeadcd76759a55/${proId}/wishlist`);
      setState({ ...state, inWishlist: true });
      
    } catch (error) {
      console.log('err',error)
    }
    
  }
  const removeWishlist = async(e,proId)=>{
    e.preventDefault()
    console.log('proid',proId)
    try {
  
      const response = await axiosInstance.delete(`http://localhost:5000/api/v1/wishlist/664db80748eeadcd76759a55/${proId}/wishlist`);
      setState({ ...state, inWishlist: false });
      
    } catch (error) {
      console.log('err',error)
    }
    
  }

  return (
    <Box className="product-card" {...handlers}>
      <Box className="image">
        <img
          src={`http://localhost:5000/uploads/${state.image[activeIndex]}` }
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
          {state.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {state.subheading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {state.description}
        </Typography>
       { <p className="warning">Hurry up! only few left</p>}
        <div>
          <p>
            <span style={{ fontSize: '22px' }}>Rs {state.price}</span>
            <span style={{ color: 'gray', fontSize: '18px', textDecoration: 'line-through', marginLeft: '10px' }}>
              {state.sale_rate}
            </span>
            <span style={{ color: 'green', marginLeft: '10px', fontSize: '22px' }}>{state.discount}% off</span>
          </p>
        </div>
        <p style={{ color: 'green' }}>Hot Deal</p> 
      </CardContent>
      <Box className="actions">
     { !state.inCart? ( <button className="action-button add-to-cart" onClick={(e)=>addCart(e,state._id)} >Add  Cart</button>) 
     : (<button className="action-button add-to-cart" onClick={(e)=>removeCart(e,state._id)} >Remove Cart</button>)}

        {!state.inWishlist? (<button className="action-button wishlist" onClick={(e)=>addWishlist(e,state._id)} > add Wishlist</button>) :
         (<button className="action-button wishlist" onClick={(e)=>removeWishlist(e,state._id)} >remove Wishlist</button>)}


      </Box>
    </Box>
  );
}

export default ProductCard;

