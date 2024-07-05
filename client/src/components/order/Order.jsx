import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Checkout from '../checkout/Checkout';

function Order() {
  const [details, setDetails] = useState([]);
  const [usersId, setUsersId] = useState(null);
  const [urlQuery, setUrlQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/getuser`);
        const userId = response.data.data[0]._id;
        setUsersId(userId);
        console.log('userrrr', userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (usersId) {
      const query = `${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}?page=1&sortField=createdAt&sortOrder=desc`;
      setUrlQuery(query);

      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(query);
          setDetails(response.data.products);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [usersId]);

  const handleOrder = () => {
    navigate(`/order`);
  };

  const handleQuantityChange = async (id, action) => {
    try {
      if (action === 'increment') {
        await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/v1/cart/increase/${id}`);
      } else if (action === 'decrement') {
        await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/v1/cart/decrease/${id}`);
      }

      // Fetch updated order items
      if (urlQuery) {
        const response = await axiosInstance.get(urlQuery);
        setDetails(response.data.products);
      }
    } catch (error) {
      console.error(`Error ${action === 'increment' ? 'incrementing' : 'decrementing'} order item quantity:`, error);
    }
  };

  const calculateTotal = () => {
    return details.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/v1/order/orderitem/${id}`);
      // Fetch updated order items
      if (urlQuery) {
        const response = await axiosInstance.get(urlQuery);
        setDetails(response.data);
      }
    } catch (error) {
      console.error('Error deleting order item:', error);
    }
  };

  function convertToServerFormat(details) {
    const products = details.map(item => ({
      product_id: item._id,
      qty: item.cartDetails.length > 0 ? item.cartDetails[0].qty : 0,
      price: item.sale_rate
    }));

    const totalPrice = products.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);

    return {
      item: products,
      totalPrice
    };
  }

  const handleBuy = async () => {
    try {
      const productsData = convertToServerFormat(details);
      console.log(productsData);

      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/v1/order/createorder/${usersId}/${'666716d82f9a542271578e2e'}`, { products: productsData });
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    const options = {
      key: 'rzp_test_wNhVz81BFxrIrL',
      amount: parseInt(1000) * 100,
      currency: 'INR',
      name: 'TUT FINDER',
      description: 'Purchase course',
      handler: function (response) {
        handlePaymentSuccess();
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentSuccess = async () => {
    console.log('success');
  };

  return (
    <div>
      <Checkout />
          {/* <table className="order-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td><img src={`${process.env.REACT_APP_API_URL}/uploads/${item.image[0]}`} alt={item.name} /></td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => handleQuantityChange(item.inCart._id, 'decrement')}>-</button>
                {item.cartDetails[0].qty}
                <button onClick={() => handleQuantityChange(item.inCart._id, 'increment')}>+</button>
              </td>
              <td>${item.price}</td>
              <td>${item.price * item.cartDetails[0].qty}</td>
              <td><button onClick={() => handleDelete(item.inCart._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-price">Total Price: ${calculateTotal()}</div>
      <div className="buy-button-container">
        <button className="buy-button" onClick={handleBuy}>Buy</button> 
      </div> */}
    </div>
  );
}

export default Order;
