import React,{useState} from 'react'
import Header from '../../layouts/header'
import Footer from '../../layouts/footer'
import Product from '../../components/product/Product'

function ProductPage() {
  const [notification,setNotification] = useState(true)

  return (
 <div>
<Header notif={notification}/>

<Product  setNotifM={setNotification} />


<div style={{marginTop:'50px'}}>
<Footer/>
</div>

 </div>
 
  )
}

export default ProductPage