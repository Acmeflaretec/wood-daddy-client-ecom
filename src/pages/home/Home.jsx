import React from 'react'
import Header from '../../layouts/header'
import Banner from '../../components/banner/banner'
import Service from '../../components/service-sec/service'
import ProductList from '../../components/productList/productList'
import Footer from '../../layouts/footer'
import OfferSale from '../../components/offerSale/offerSale'
import ContentSection from '../../components/contentSection/contentSection'
import ContactSec from '../../components/contactSec/contactSec'
import HomeCategory from '../../components/homecategory/homeCategory'

function Home() {
const title = 'Our Customizable Furnitures'
const para ='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut leo a justo faucibus vestibulum. Morbi tristique velit eget nulla viverra, nec condimentum libero venenatis. Aliquam erat volutpat. Sed sit amet sapien in libero tempus vulputate.'


  return (
    <div>
      <Header/>
      <Banner/>
      <ContentSection title={title} para={para} />
      <HomeCategory/>
      <OfferSale/>
      <ProductList title={'Recent Furnitures'} />
      <ContactSec/>
      <Service/>
      <Footer/>

      </div>
  )
}

export default Home