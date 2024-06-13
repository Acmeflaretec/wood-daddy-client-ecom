import React,{useState,useEffect} from 'react'
import Header from '../../layouts/header'
import Banner from '../../components/banner/banner'
import Service from '../../components/service-sec/service'
import ProductList from '../../components/productList/productList'
import Footer from '../../layouts/footer'
import OfferSale from '../../components/offerSale/offerSale'
import ContentSection from '../../components/contentSection/contentSection'
import ContactSec from '../../components/contactSec/contactSec'
import HomeCategory from '../../components/homecategory/homeCategory'
import axiosInstance from '../../axios';

function Home() {
  const [userDetails,setUserDetails] = useState(null)

useEffect(() => {
 
  const fetchData = async () => {
try {
  
  const response = await axiosInstance.get(`http://localhost:5000/api/v1/auth/getuser`);
  setUserDetails(response.data.data[0])
  console.log('userrrr',response.data.data[0])
} catch (error) {
  console.log('errr',error)
}

  }
  fetchData()
   
}, []);
 
  return (
    <div>
      <Header/>
      <Banner/>
      <ContentSection  />
      <HomeCategory/>
      <OfferSale/>
      <ProductList title={'Recent Furnitures'} recentf={true}  />
      <ContactSec/>
      <Service/>
      <Footer/>

      </div>
  )
}

export default Home