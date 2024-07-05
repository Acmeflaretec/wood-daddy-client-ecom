import React from 'react'
import Header from '../../layouts/header'
import Footer from '../../layouts/footer'
import Product from '../../components/product/Product'

function ProductPage() {
  return (
 <div>
<Header/>

<Product/>


<div style={{marginTop:'50px'}}>
<Footer/>
</div>

 </div>
 
  )
}

export default ProductPage