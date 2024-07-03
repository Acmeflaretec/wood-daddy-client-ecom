import React, { useState,useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

import './index.css';
import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums';
import AccordionBox from '../accordion/Accordion';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useSwipeable } from 'react-swipeable';

function Product() {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [details, setDetails] = useState([]);
  const [usersId,setUsersId] = useState()
  const navigate = useNavigate();

  const [state,setState] = useState(details)

  const [activeIndex, setActiveIndex] = useState(0);

  //console.log('slider ',details.image[activeIndex])

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % details.image.length);
  };

  const handleBack = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + details.image.length) % details.image.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
  });

  // 

  useEffect(() => {
   
    const fetchData = async () => {
      const response = await axiosInstance.get(`http://localhost:5000/api/v1/auth/getuser`);
      setUsersId(response.data.data[0]._id)
      console.log('userrrr',response.data.data[0]._id)
    }
    fetchData()
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/v1/products/${productId}`);
        setDetails(response.data.product);
         console.log('prooo',response.data.product)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
      fetchData();
     
  }, []);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

const addCart = async(e,proId)=>{

  e.preventDefault()
  console.log('proid',proId)
    try {
  
      const response = await axiosInstance.post(`http://localhost:5000/api/v1/cart/${usersId}/${proId}`);
      setDetails({ ...details, inCart: true });
      
    } catch (error) {
      console.log('err',error)
    }
    

}
const removeCart = async(e,proId)=>{

  e.preventDefault()
  console.log('proid',proId)
  try {

    const response = await axiosInstance.delete(`http://localhost:5000/api/v1/cart/${usersId}/${proId}`);
    setDetails({ ...details, inCart: false });
    
  } catch (error) {
    console.log('err',error)
  }
  
}
const addWishlist = async(e,proId)=>{
  e.preventDefault()
console.log('proid',proId)
  try {

    const response = await axiosInstance.post(`http://localhost:5000/api/v1/wishlist/${usersId}/${proId}/wishlist`);
    setDetails({ ...details, inWishlist: true });
    
  } catch (error) {
    console.log('err',error)
  }
  
}
const removeWishlist = async(e,proId)=>{
  e.preventDefault()
  console.log('proid',proId)
  try {

    const response = await axiosInstance.delete(`http://localhost:5000/api/v1/wishlist/${usersId}/${proId}/wishlist`);
    setDetails({ ...details, inWishlist: false });
    
  } catch (error) {
    console.log('err',error)
  }
  
}

  return (
    <div className='Product'>
      <div style={{height:'60px',display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>
      <ActiveLastBreadcrumb/>

      </div>

      <div className="proSub">
        <div className="imgFrame">
          {/* <img src='/gallery/products/p1.jpg' alt='Product' /> */}
          <img
  src={details && details.image && details.image.length > 0 ? `http://localhost:5000/uploads/${details.image[activeIndex]}` : ''}
  alt={`Product Image`}
/>

<div className="nav-button">
  <IconButton className="prev" onClick={handleBack}  >
    <KeyboardArrowLeft />
  </IconButton>
  <IconButton className="next" onClick={handleNext}  >
    <KeyboardArrowRight />
  </IconButton>
</div>
        </div>

      

        <div className="proContents">
        <h2 className='ftitle' >{details.name}</h2>  
     <p > <span className='fpr' >Rs:{details.sale_rate}</span>
      <span className='fdpr' >{details.price }</span> 
     <span  className='dcnt'> {details.discount}% off</span>  </p>
    
     <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
     {/* <p className='qtyn' style={{fontSize:'22px'}} >Quantity: </p>
     <div className="quantity-counter">
      <button className="quantity-button" onClick={decrementQuantity}>-</button>
      <span className="quantity">{quantity}</span>
      <button className="quantity-button" onClick={incrementQuantity}>+</button>
    </div> */}
     </div>
 { details?.stock <=10 ?  ( <p className='warning'>Hurry up! only {details.stock} left</p>):('')}

     <div className="button-container">
     { !details.inCart? ( <button className="add-to-cart-button" onClick={ usersId ? (e)=> addCart(e,details._id) : ()=> navigate('/login') } >Add Cart</button>) 
     : (<button className="add-to-cart-button" onClick={usersId ? (e)=> removeCart(e,details._id) : ()=> navigate('/login') } >Remove Cart</button>)}

{ !details.inWishlist? (  <button className="add-to-wishlist-button" onClick={usersId ? (e)=> addWishlist(e,details._id) : () => navigate('/login') } >Add Wishlist</button>) 
     : ( <button className="add-to-wishlist-button" onClick={ usersId ?  (e)=> removeWishlist(e,details._id) : () => navigate('/login') } >Remove Wishlist</button>)}
     

      
    </div>
    
{/* accordion */}
<AccordionBox  accDetails={details} />



        </div>
      </div>
    </div>
  );
}

export default Product;
