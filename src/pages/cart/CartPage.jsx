import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import Header from '../../layouts/header'
import Footer from '../../layouts/footer'
import Cart from '../../components/cart/Cart'
import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums'

function CartPage() {

  const [details, setDetails] = useState([]);
  var urlQuery = `http://localhost:5000/api/v1/cart/664db80748eeadcd76759a55?page=1&limit=6&sortField=createdAt&sortOrder=desc` ;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setDetails(response.data.products);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
      fetchData();
     
  }, []);

  return (
    <div>
       <Header />
       <div style={{height:'60px',display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>
    <ActiveLastBreadcrumb/>

    </div>

    {details && details.map((pro, index) => (
<>
<Cart key={index} productDetails={pro} />
</>


))}

     
     
<div style={{marginTop:'30px'}}>
<Footer />
</div>
     
    </div>
  )
}

export default CartPage