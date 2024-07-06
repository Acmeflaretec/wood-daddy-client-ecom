import React,{useState,useEffect} from 'react'
import Header from '../../layouts/header'
import Banner from '../../components/banner/banner'
import Service from '../../components/service-sec/service'
import Footer from '../../layouts/footer'
import OfferSale from '../../components/offerSale/offerSale'
import ContentSection from '../../components/contentSection/contentSection'
import ContactSec from '../../components/contactSec/contactSec'
import HomeCategory from '../../components/homecategory/homeCategory'
import ProductScroll from '../../components/productScroll/ProductScroll'
import axiosInstance from '../../axios';

function Home() {
  const [userDetails,setUserDetails] = useState(null)
  const [notification,setNotification] = useState(true)

useEffect(() => {
 
  const fetchData = async () => {
try {
  
  const response = await axiosInstance.get(`/api/v1/auth/getuser`);
  setUserDetails(response.data.data[0])
  setNotification(prev => !prev)
  console.log('userrrr',response.data.data[0])
} catch (error) {
  console.log('errr',error)
}

  }
  fetchData()
   
}, []);
 
  return (
    <div>
      <Header notif={notification} notificationM={notification} />
      <Banner/>
      <ContentSection  />
      <HomeCategory/>
      <OfferSale/>

      <ProductScroll type={'home'} setNotif={setNotification}  /> 

      {/* <ProductList recentf={true}  /> */}
      <ContactSec/>
      <Service/>
      <Footer/>

      </div>
  )
}

export default Home