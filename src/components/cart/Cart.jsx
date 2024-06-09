// import React, { useState,useEffect } from 'react';
// import axiosInstance from '../../axios';import './index.css';
// import { useNavigate } from 'react-router-dom';
// import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums';
// import AccordionBox from '../accordion/Accordion';

// function Cart(props) {
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();



//   const {productDetails} = props

//   const incrementQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleCardClick = () => {
//     // Navigate to /product route
//     navigate(`/product/${productDetails._id}`);
//   };

//   const removeCart = async(e,proId)=>{

//     e.preventDefault()
//     console.log('proid',proId)
//     try {
  
//       const response = await axiosInstance.delete(`http://localhost:5000/api/v1/cart/664db80748eeadcd76759a55/${proId}`);
//       setDetails({ ...details, inCart: false });
      
//     } catch (error) {
//       console.log('err',error)
//     }
    
//   }

//   return (
//     <div className='Product' style={{marginTop:'30px'}}>
   

//     <div className="proSub">
//       <div className="imgFrame">
//         <img src='/gallery/products/p1.jpg' alt='Product' onClick={handleCardClick} />
//       </div>
//       <div className="proContents">
//       <h2 className='ftitle' >{productDetails.name}</h2>  
//    <p > <span className='fpr' >Rs:{productDetails.price}</span>
//     <span className='fdpr' >{productDetails.sale_rate}</span> 
//    <span  className='dcnt'> {productDetails.discount}% off</span>  </p>
  
//    <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
//    <p className='qtyn' style={{fontSize:'22px'}} >Quantity: </p>
//    <div className="quantity-counter">
//     <button className="quantity-button" onClick={decrementQuantity}>-</button>
//     <span className="quantity">{quantity}</span>
//     <button className="quantity-button" onClick={incrementQuantity}>+</button>
//   </div>
//    </div>
//    <p className='warning'>Hurry up! only few left</p>

//    <div className="button-container">


//     <button className="add-to-cart-button">Remove</button>
//     <button className="add-to-wishlist-button">Buy Item</button>

    
//   </div>
  
// {/* accordion */}
// <AccordionBox accDetails={productDetails} />



//       </div>
//     </div>
//   </div>
//   )
// }

// export default Cart

import React, { useState } from 'react';
import axiosInstance from '../../axios';
import './index.css';
import { useNavigate } from 'react-router-dom';
import AccordionBox from '../accordion/Accordion';

function Cart(props) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { productDetails, details, setDetails } = props;

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${productDetails._id}`);
  };

  const removeCart = async (e, proId) => {
    e.preventDefault();
    console.log('proid', proId);
    try {
      const response = await axiosInstance.delete(`http://localhost:5000/api/v1/cart/664db80748eeadcd76759a55/${proId}`);
      setDetails(details.filter((item) => item._id !== proId));
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <div className='Product' style={{ marginTop: '30px' }}>
      <div className="proSub">
        <div className="imgFrame">
          <img src='/gallery/products/p1.jpg' alt='Product' onClick={handleCardClick} />
        </div>
        <div className="proContents">
          <h2 className='ftitle'>{productDetails.name}</h2>
          <p>
            <span className='fpr'>Rs:{productDetails.price}</span>
            <span className='fdpr'>{productDetails.sale_rate}</span>
            <span className='dcnt'>{productDetails.discount}% off</span>
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <p className='qtyn' style={{ fontSize: '22px' }}>Quantity: </p>
            <div className="quantity-counter">
              <button className="quantity-button" onClick={decrementQuantity}>-</button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-button" onClick={incrementQuantity}>+</button>
            </div>
          </div>
          <p className='warning'>Hurry up! only few left</p>

          <div className="button-container">
            <button className="add-to-cart-button" onClick={(e) => removeCart(e, productDetails._id)}>Remove</button>
            <button className="add-to-wishlist-button">Buy Item</button>
          </div>

          {/* accordion */}
          <AccordionBox accDetails={productDetails} />
        </div>
      </div>
    </div>
  );
}

export default Cart;

