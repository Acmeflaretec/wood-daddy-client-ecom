import React from 'react';
import { Route, Routes } from "react-router-dom";
import AboutPage from '../pages/about/AboutPage';
import AddressPage from '../pages/address/AddressPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import CartPage from '../pages/cart/CartPage';
import ContactPage from '../pages/contact/ContactPage';
import CreateAddressPage from '../pages/createAddress/CreateAddressPage';
import Home from '../pages/home/Home';
import OrderPage from '../pages/order/OrderPage';
import ProductPage from '../pages/product/Product';
import ProductsFetch from '../pages/productsfetch/productsFetch';
import MainProfile from '../pages/profile/MainProfile';
import SearchPage from '../pages/search/SearchPage';
import ServicePage from '../pages/service/ServicePage';
import WishlistPage from '../pages/wishlist/Wishlist';

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
    <Route path="/productfetch" element={<ProductsFetch />} />
  </Routes>

  <Routes>
    <Route path="/addressform" element={<CreateAddressPage />} />
  </Routes>
  <Routes>
    <Route path="/address" element={<AddressPage />} />
  </Routes>
  <Routes>
    <Route path="/profile" element={<MainProfile />} />
  </Routes>
 

   </>
  
   
  )
}

export default routes