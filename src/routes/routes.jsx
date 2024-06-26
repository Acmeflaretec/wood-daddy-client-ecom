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
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import CreateAddressPage from '../pages/createAddress/CreateAddressPage';
import AddressPage from '../pages/address/AddressPage';

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
    <Route path="/login" element={<LoginPage />} />
  </Routes>
  <Routes>
    <Route path="/signup" element={<SignupPage />} />
  </Routes>
  <Routes>
    <Route path="/productfetch/:cat" element={<ProductsFetch />} />
  </Routes>

  <Routes>
    <Route path="/addressform" element={<CreateAddressPage />} />
  </Routes>
  <Routes>
    <Route path="/address" element={<AddressPage />} />
  </Routes>

   </>
  
   
  )
}

export default routes