import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../pages/home/Home';
import ProductPage from '../pages/product/Product';
import WishlistPage from '../pages/wishlist/Wishlist';
import AboutPage from '../pages/about/AboutPage';
import ServicePage from '../pages/service/ServicePage';
import ContactPage from '../pages/contact/ContactPage';
import SearchPage from '../pages/search/SearchPage';
import CartPage from '../pages/cart/CartPage';
import ProductsFetch from '../pages/productsfetch/productsFetch';
import OrderPage from '../pages/order/OrderPage';

function routes() {
  return (
   <>

     <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <Routes>
    <Route path="/product/:productId" element={<ProductPage />} />
  </Routes>
  <Routes>
    <Route path="/wishlist" element={<WishlistPage />} />
  </Routes>
  <Routes>
    <Route path="/order" element={<OrderPage />} />
  </Routes>
  <Routes>
    <Route path="/about" element={<AboutPage />} />
  </Routes>
  <Routes>
    <Route path="/service" element={<ServicePage />} />
  </Routes>
  <Routes>
    <Route path="/contact" element={<ContactPage />} />
  </Routes>
  <Routes>
    <Route path="/search/:searchItem" element={<SearchPage />} />
  </Routes>
  <Routes>
    <Route path="/cart" element={<CartPage />} />
  </Routes>
  <Routes>
    <Route path="/productfetch/:cat" element={<ProductsFetch />} />
  </Routes>

   </>
  
   
  )
}

export default routes