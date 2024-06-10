

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../axios';
// import './index.css';

// function Order() {
//   const [details, setDetails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55');
//         setDetails(response.data);
//         console.log('prooorder', response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleQuantityChange = async (id, action) => {
//     console.log('iddd', id);
//     try {
//       if (action === 'increment') {
//         await axiosInstance.put(`http://localhost:5000/api/v1/order/orderitem/increment/${id}`);
//       } else if (action === 'decrement') {
//         await axiosInstance.put(`http://localhost:5000/api/v1/order/orderitem/decrement/${id}`);
//       }

//       // Fetch updated order items
//       const response = await axiosInstance.get('http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55');
//       setDetails(response.data);
//     } catch (error) {
//       console.error(`Error ${action === 'increment' ? 'incrementing' : 'decrementing'} order item quantity:`, error);
//     }
//   };

//   const calculateTotal = () => {
//     return details.reduce((total, item) => total + item.quantity * item.price, 0);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete(`http://localhost:5000/api/v1/order/orderitem/${id}`);
//         // Fetch updated order items
//         const response = await axiosInstance.get('http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55');
//         setDetails(response.data);
//     } catch (error) {
//       console.error('Error deleting order item:', error);
//     }
//   };

//   return (
//     <div>
//       <table className="order-table">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Qty</th>
//             <th>Rate</th>
//             <th>Total rate</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {details.map((item, index) => (
//             <tr key={item._id}>
//               <td>{index + 1}</td>
//               <td><img src={`http://localhost:5000/uploads/${item.productId.image[0]}`} alt={item.productId.name} /></td>
//               <td>{item.productId.name}</td>
//               <td>
//                 <button onClick={() => handleQuantityChange(item._id, 'decrement')}>-</button>
//                 {item.quantity}
//                 <button onClick={() => handleQuantityChange(item._id, 'increment')}>+</button>
//               </td>
//               <td>${item.price}</td>
//               <td>${item.price * item.quantity}</td>
//               <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="total-price">Total Price: ${calculateTotal()}</div>
//       <div className="buy-button-container">
//         <button className="buy-button">Buy</button>
//       </div>
//     </div>
//   );
// }

// export default Order;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import './index.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Order() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();


const handleOrder = async () => {
 navigate(`/order`);

}

var urlQuery = `http://localhost:5000/api/v1/cart/664db80748eeadcd76759a55?page=1&sortField=createdAt&sortOrder=desc`;

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(urlQuery);
      setDetails(response.data.products);
      console.log('orderrr',response.data.products)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get('http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55');
  //       setDetails(response.data);
  //       console.log('prooorder', response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleQuantityChange = async (id, action) => {
    console.log('iddd', id);
    try {
      if (action === 'increment') {
        await axiosInstance.put(`http://localhost:5000/api/v1/cart/increase/${id}`);
      } else if (action === 'decrement') {
        await axiosInstance.put(`http://localhost:5000/api/v1/cart/decrease/${id}`);
      }

      // Fetch updated order items
      const response = await axiosInstance.get(urlQuery);
      setDetails(response.data.products);
    } catch (error) {
      console.error(`Error ${action === 'increment' ? 'incrementing' : 'decrementing'} order item quantity:`, error);
    }
  };

  const calculateTotal = () => {
    return details.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/v1/order/orderitem/${id}`);
      // Fetch updated order items
      const response = await axiosInstance.get(urlQuery);
      setDetails(response.data);
    } catch (error) {
      console.error('Error deleting order item:', error);
    }
  };

  const handleBuy = async () => {
    try {
      // Get the IDs of order items
      const orderItemIds = details.map(item => item._id);

      // Calculate total amount
      const totalAmount = calculateTotal();

      // Prepare customer dummy data
      const customerDummyData = {
        name: "John Doe",
        email: "johndoe@example.com",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345"
        }
      };

      // Prepare data for creating the order
      const orderData = {
      
        customer: customerDummyData,
        orderItems: orderItemIds,
        totalAmount,
        status: 'pending' // Set initial status as 'pending'
      };
console.log('orddataaa',orderData)
      // Send a POST request to create the order
      const response = await axiosInstance.post(`http://localhost:5000/api/v1/order/createorder/${'664db80748eeadcd76759a55'}`, orderData);
      console.log('Order created:', response.data);
      // Optionally, you can perform additional actions after the order is created
    } catch (error) {
      console.error('Error creating order:', error);
      // Optionally, you can handle error cases here
    }
  };

  return (
    <div>
      <table className="order-table">
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
              <td><img src={`http://localhost:5000/uploads/${item.image[0]}`} alt={item.name} /></td>
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
      </div>
    </div>
  );
}

export default Order;

