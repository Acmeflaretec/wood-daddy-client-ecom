import React, { useState, useEffect } from 'react';
import Header from '../../layouts/header'
import ProductList from '../../components/productList/productList'
import Footer from '../../layouts/footer'

function WishlistPage() {
  const [notification,setNotification] = useState(true)

  return (
    <div>
      <Header  notif={notification}/>
      <ProductList title={'Wish List'} type={'wishlist'} setNotif={setNotification}/>
      
      <Footer/>
    </div>
  )
}

export default WishlistPage