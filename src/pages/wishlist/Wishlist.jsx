import React from 'react'
import Header from '../../layouts/header'
import ProductList from '../../components/productList/productList'
import Footer from '../../layouts/footer'

function WishlistPage() {
  return (
    <div>
      <Header/>
      <ProductList title={'Wish List'} type={'wishlist'} />
      
      <Footer/>
    </div>
  )
}

export default WishlistPage