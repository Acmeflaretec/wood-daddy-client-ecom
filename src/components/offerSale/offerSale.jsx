import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import './index.css'

function OfferSale() {

  const [offers, setOffers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/v1/advertisement');
        setOffers(response.data.data[0]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
      fetchData();
     
  }, []);

  return (
<div className='OfferSale' style={{backgroundImage: 'url(/gallery/b2.jpg)', height:'400px', width:'100%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', color: 'white'}}>
  <p style={{fontSize:'35px'}}>upto {offers.offer}% off</p>
  <h1 style={{fontFamily:'sans-serif',fontSize:'45px'}} >{offers.title}</h1>
  <p>{offers.subtitle}</p>
  <div className="salesBtn">
  <div className="salesBtn">SHOP FOR SALE</div>

</div>

</div>



  )
}

export default OfferSale