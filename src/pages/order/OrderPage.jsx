import React, { useState, useEffect } from 'react';
import Header from '../../layouts/header'
import Footer from '../../layouts/footer'
import Order from '../../components/order/Order';

function OrderPage() {
  return (
    <div>
      <Header />
    <Order />

      <Footer />

      </div>
  )
}

export default OrderPage