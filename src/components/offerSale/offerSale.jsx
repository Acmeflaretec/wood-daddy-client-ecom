import React from 'react'
import './index.css'

function OfferSale() {
  return (
<div className='OfferSale' style={{backgroundImage: 'url(/gallery/b2.jpg)', height:'400px', width:'100%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', color: 'white'}}>
  <p style={{fontSize:'35px'}}>upto 60% off</p>
  <h1 style={{fontFamily:'sans-serif',fontSize:'45px'}} >Anniversary offer</h1>
  <p>Sofa|Chair|Table</p>
  <div className="salesBtn">
  <div className="salesBtn">SHOP FOR SALE</div>

</div>

</div>



  )
}

export default OfferSale