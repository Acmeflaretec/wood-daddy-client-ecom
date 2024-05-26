import React, { useState,useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import './index.css';
import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums';
import AccordionBox from '../accordion/Accordion';

function Product() {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  const [details, setDetails] = useState([]);

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

  return (
    <div className='Product'>
      <div style={{height:'60px',display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>
      <ActiveLastBreadcrumb/>

      </div>

      <div className="proSub">
        <div className="imgFrame">
          <img src='/gallery/products/p1.jpg' alt='Product' />
        </div>
        <div className="proContents">
        <h2 className='ftitle' >{details.name}</h2>  
     <p > <span className='fpr' >Rs:{details.price}</span>
      <span className='fdpr' >{details.price - details.sale_rate}</span> 
     <span  className='dcnt'> {details.discount}% off</span>  </p>
    
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
     { !details.inCart? ( <button className="add-to-cart-button">Add Cart</button>) 
     : (<button className="add-to-cart-button">Remove Cart</button>)}

{ !details.inWishlist? (  <button className="add-to-wishlist-button">Add Wishlist</button>) 
     : ( <button className="add-to-wishlist-button">Remove Wishlist</button>)}
     

      
    </div>
    
{/* accordion */}
<AccordionBox  accDetails={details} />



        </div>
      </div>
    </div>
  );
}

export default Product;
