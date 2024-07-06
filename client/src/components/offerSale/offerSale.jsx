import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import './index.css'
import { useNavigate, useParams , useLocation} from 'react-router-dom';

function OfferSale() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/advertisement`);
        setOffers(response.data.data[0]);
        console.log(response.data.data[0])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
      fetchData();
     
  }, []);

  return (
<div className='OfferSale' 
style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}/uploads/${offers.imgUrl})`, 
  height:'400px', width:'100%',
 backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', 
 flexDirection: 'column', position: 'relative', color: 'white'}}>
  <p style={{fontSize:'35px'}}>upto {offers.offer}% off</p>
  <h1 style={{fontFamily:'sans-serif',fontSize:'45px'}} >{offers.title}</h1>
  <p>{offers.subtitle}</p>
  <div className="salesBtn">
  <div className="salesBtn" onClick={()=>navigate(`/productfetch?allProducts=allProducts`)} >SHOP FOR SALE</div>

</div>

</div>



  )
}

export default OfferSale