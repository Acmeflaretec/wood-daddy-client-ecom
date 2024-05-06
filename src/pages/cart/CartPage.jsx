import React from 'react'
import Header from '../../layouts/header'
import Footer from '../../layouts/footer'
import Cart from '../../components/cart/Cart'
import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums'

function CartPage() {
  return (
    <div>
       <Header />
       <div style={{height:'60px',display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>
    <ActiveLastBreadcrumb/>

    </div>
      <Cart />
      <Cart />
      <Cart />
<div style={{marginTop:'30px'}}>
<Footer />
</div>
     
    </div>
  )
}

export default CartPage