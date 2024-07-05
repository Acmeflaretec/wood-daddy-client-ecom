 

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import Cart from '../../components/cart/Cart';
import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  const [usersId,setUsersId] = useState()
  useEffect(() => {
   
    const fetchData = async () => {
      const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/getuser`);
      setUsersId(response.data.data[0]._id)
      console.log('userrrr',response.data.data[0]._id)
    }
    fetchData()
    
  }, []);
  useEffect(() => {
    if (usersId) {
      const urlQuery = `${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}?page=1&sortField=createdAt&sortOrder=desc`;
      // Now you can use the urlQuery for further data fetching or processing
      console.log('URL Query:', urlQuery);
      // You can also fetch data here if needed
      const fetchCartData = async () => {
        try {
          const response = await axiosInstance.get(urlQuery);
          setDetails(response.data.products);
          // Handle the cart data
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };
      fetchCartData();
    }
  }, [usersId]);


  const handleOrder = async () => {
   navigate(`/order`);
  
  }
   


  return (
    <div>
      <Header />
   
        <Cart  />
       

      <div style={{ marginTop: '30px' }}>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;

