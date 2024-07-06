import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import OrderList from './OrderList';
import SingleOrder from './SingleOrder';

// Mock data for orders with more details
const mockOrders = [
  {
    id: '1001',
    date: '2023-07-01',
    total: 129.99,
    status: 'Delivered',
    shippingAddress: '123 Main St, Anytown, AN 12345',
    subtotal: 119.99,
    shipping: 5.00,
    tax: 5.00,
    items: [
      {
        name: 'Product A',
        image: 'https://example.com/productA.jpg',
        quantity: 2,
        price: 29.99
      },
      {
        name: 'Product B',
        image: 'https://example.com/productB.jpg',
        quantity: 1,
        price: 59.99
      }
    ]
  },
  {
    id: '1002',
    date: '2023-07-05',
    total: 79.99,
    status: 'Shipped',
    shippingAddress: '456 Elm St, Othertown, OT 67890',
    subtotal: 69.99,
    shipping: 5.00,
    tax: 5.00,
    items: [
      {
        name: 'Product C',
        image: 'https://example.com/productC.jpg',
        quantity: 1,
        price: 69.99
      }
    ]
  },
  {
    id: '1003',
    date: '2023-07-10',
    total: 199.99,
    status: 'Processing',
    shippingAddress: '789 Oak St, Somewhere, SW 13579',
    subtotal: 184.99,
    shipping: 10.00,
    tax: 5.00,
    items: [
      {
        name: 'Product D',
        image: 'https://example.com/productD.jpg',
        quantity: 1,
        price: 99.99
      },
      {
        name: 'Product E',
        image: 'https://example.com/productE.jpg',
        quantity: 2,
        price: 42.50
      }
    ]
  },
];

function ProfileOrder() {
  const [orders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };

  return (
    
    <div>
      
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>Your Orders</Typography>
          <OrderList orders={orders} onOrderClick={handleOrderClick} />
          <SingleOrder order={selectedOrder} onClose={handleCloseDialog} />
        </Container>
     
    </div>
  );
}

export default ProfileOrder;


// import React, { useState, useEffect } from 'react';
// import { Container, Typography } from '@mui/material';
// import OrderList from './OrderList';
// import SingleOrder from './SingleOrder';

// function ProfileOrder() {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       // Replace this with your actual API call
//       const response = await fetch('https://your-api.com/orders');
//       if (!response.ok) {
//         throw new Error('Failed to fetch orders');
//       }
//       const data = await response.json();
//       setOrders(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//   };

//   const handleCloseDialog = () => {
//     setSelectedOrder(null);
//   };

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography>Error: {error}</Typography>;

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" gutterBottom>Your Orders</Typography>
//       <OrderList orders={orders} onOrderClick={handleOrderClick} />
//       <SingleOrder order={selectedOrder} onClose={handleCloseDialog} />
//     </Container>
//   );
// }

// export default ProfileOrder;