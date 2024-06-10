// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../axios';
// import './index.css';


// function Order() {

//   const [details, setDetails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(`http://localhost:5000/api/v1/order/orderitem/${'664db80748eeadcd76759a55'}`);
//         setDetails(response.data);
//          console.log('prooorder',response.data)
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

    
//       fetchData();
     
//   }, []);

//   const [items, setItems] = useState([
//     { id: 1, image: 'product1.jpg', name: 'Product 1', qty: 2, rate: 25 },
//     { id: 2, image: 'product2.jpg', name: 'Product 2', qty: 1, rate: 35 },
//     { id: 3, image: 'product3.jpg', name: 'Product 3', qty: 3, rate: 20 },
//   ]);

//   const handleQuantityChange = async(id, action) => {
//     const updatedItems = items.map((item) => {
//       if (item.id === id) {
//         if (action === 'increment') {

//           const response = await axiosInstance.put(`/order-items/increment/${item.id}`);


//           return { ...item, qty: item.qty + 1 };
//         } else if (action === 'decrement' && item.qty > 1) {

//           const response = await axiosInstance.put(`/order-items/decrement/${item.id}`);



//           return { ...item, qty: item.qty - 1 };
//         }
//       }
//       return item;
//     });
//     setItems(updatedItems);
//   };

//   const calculateTotal = () => {
//     return items.reduce((total, item) => total + item.qty * item.rate, 0);
//   };

//   const handleDelete = (id) => {
//     const updatedItems = items.filter((item) => item.id !== id);
//     setItems(updatedItems);
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
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td><img src={`http://localhost:5000/uploads/${item.productId.image[0]}`} alt={item.productId.name} /></td>
//               <td>{item.productId.name}</td>
//               <td>
//                 <button onClick={() => handleQuantityChange(item._id, 'decrement')}>-</button>
//                 {item.quantity}
//                 <button onClick={() => handleQuantityChange(item._id, 'increment')}>+</button>
//               </td>
//               <td>${item.price}</td>
//               <td>${item.price*item.quantity}</td>
//               <td><button onClick={() => handleDelete(item.productId.id)}>Delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="total-price">Total Price: ${calculateTotal()}</div>
//       <div className="buy-button-container">
//         <button className="buy-button">Buy</button>
//       </div>    </div>
//   );
// }

// export default Order


// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../axios';
// import './index.css';

// function Order() {
//   const [details, setDetails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(`http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55`);
//         setDetails(response.data);
//         console.log('prooorder', response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleQuantityChange = async (id, action) => {
//     console.log('iddd',id)
//     try {
//       if (action === 'increment') {
//         await axiosInstance.put(`http://localhost:5000/api/v1/order/orderitem/increment/${id}`);
//       } else if (action === 'decrement') {
//         await axiosInstance.put(`http://localhost:5000/api/v1/order/orderitem/decrement/${id}`);
//       }

//       // Fetch updated order items
//       const response = await axiosInstance.get(`http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55`);
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
//       await axiosInstance.delete(`/order-items/${id}`);
//       const updatedItems = details.filter((item) => item._id !== id);
//       setDetails(updatedItems);
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

function Order() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55');
        setDetails(response.data);
        console.log('prooorder', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = async (id, action) => {
    console.log('iddd', id);
    try {
      if (action === 'increment') {
        await axiosInstance.put(`http://localhost:5000/api/v1/order/orderitem/increment/${id}`);
      } else if (action === 'decrement') {
        await axiosInstance.put(`http://localhost:5000/api/v1/order/orderitem/decrement/${id}`);
      }

      // Fetch updated order items
      const response = await axiosInstance.get('http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55');
      setDetails(response.data);
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
        const response = await axiosInstance.get('http://localhost:5000/api/v1/order/orderitem/664db80748eeadcd76759a55');
        setDetails(response.data);
    } catch (error) {
      console.error('Error deleting order item:', error);
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
              <td><img src={`http://localhost:5000/uploads/${item.productId.image[0]}`} alt={item.productId.name} /></td>
              <td>{item.productId.name}</td>
              <td>
                <button onClick={() => handleQuantityChange(item._id, 'decrement')}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(item._id, 'increment')}>+</button>
              </td>
              <td>${item.price}</td>
              <td>${item.price * item.quantity}</td>
              <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-price">Total Price: ${calculateTotal()}</div>
      <div className="buy-button-container">
        <button className="buy-button">Buy</button>
      </div>
    </div>
  );
}

export default Order;
