import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums';
import AccordionBox from '../accordion/Accordion';

function Cart(props) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();



  const {productDetails} = props

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCardClick = () => {
    // Navigate to /product route
    navigate(`/product/${productDetails._id}`);
  };

  return (
    <div className='Product' style={{marginTop:'30px'}}>
   

    <div className="proSub">
      <div className="imgFrame">
        <img src='/gallery/products/p1.jpg' alt='Product' onClick={handleCardClick} />
      </div>
      <div className="proContents">
      <h2 className='ftitle' >Furniture name</h2>  
   <p > <span className='fpr' >Rs:{productDetails.price}</span>
    <span className='fdpr' >{productDetails.sale_rate}</span> 
   <span  className='dcnt'> {productDetails.discount}% off</span>  </p>
  
   <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
   <p className='qtyn' style={{fontSize:'22px'}} >Quantity: </p>
   <div className="quantity-counter">
    <button className="quantity-button" onClick={decrementQuantity}>-</button>
    <span className="quantity">{quantity}</span>
    <button className="quantity-button" onClick={incrementQuantity}>+</button>
  </div>
   </div>
   <p className='warning'>Hurry up! only 3 left</p>

   <div className="button-container">


    <button className="add-to-cart-button">Remove</button>
    <button className="add-to-wishlist-button">Buy Item</button>

    
  </div>
  
{/* accordion */}
<AccordionBox accDetails={productDetails} />



      </div>
    </div>
  </div>
  )
}

export default Cart