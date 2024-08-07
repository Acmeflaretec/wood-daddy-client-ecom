import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/about/AboutPage";
import AddressPage from "../pages/address/AddressPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import CartPage from "../pages/cart/CartPage";
import ContactPage from "../pages/contact/ContactPage";
import CreateAddressPage from "../pages/createAddress/CreateAddressPage";
import Home from "../pages/home/Home";
import OrderPage from "../pages/order/OrderPage";
import ProductPage from "../pages/product/Product";
import ProductsFetch from "../pages/productsfetch/productsFetch";
import MainProfile from "../pages/profile/MainProfile";
import SearchPage from "../pages/search/SearchPage";
import ServicePage from "../pages/service/ServicePage";
import WishlistPage from "../pages/wishlist/Wishlist";
import Layout from "../layouts/Layout";
import Checkout from "../components/checkout/Checkout";

function routes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search/:searchItem" element={<SearchPage />} />
        <Route path="/productfetch" element={<ProductsFetch />} />
        {/* <Route path="/addressform" element={<CreateAddressPage />} /> */}
        {/* <Route path="/address" element={<AddressPage />} /> */}
        <Route path="/profile" element={<MainProfile />} />
      </Route>
      <Route path="/order" element={<Checkout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default routes;
