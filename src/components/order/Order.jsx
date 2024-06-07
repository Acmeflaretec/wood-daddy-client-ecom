import React, { useState, useEffect } from 'react';
import './index.css';


function Order() {
  const [items, setItems] = useState([
    { id: 1, image: 'product1.jpg', name: 'Product 1', qty: 2, rate: 25 },
    { id: 2, image: 'product2.jpg', name: 'Product 2', qty: 1, rate: 35 },
    { id: 3, image: 'product3.jpg', name: 'Product 3', qty: 3, rate: 20 },
  ]);

  const handleQuantityChange = (id, action) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        if (action === 'increment') {
          return { ...item, qty: item.qty + 1 };
        } else if (action === 'decrement' && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
      }
      return item;
    });
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.qty * item.rate, 0);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
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
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td><img src={item.image} alt={item.name} /></td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => handleQuantityChange(item.id, 'decrement')}>-</button>
                {item.qty}
                <button onClick={() => handleQuantityChange(item.id, 'increment')}>+</button>
              </td>
              <td>${item.rate}</td>
              <td>${item.rate*item.qty}</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-price">Total Price: ${calculateTotal()}</div>
      <div className="buy-button-container">
        <button className="buy-button">Buy</button>
      </div>    </div>
  );
}

export default Order