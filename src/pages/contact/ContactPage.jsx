import React from 'react'
import Header from '../../layouts/header'
import PageTitleBox from '../../common/pageTitleBox/PageTitleBox'
import MapAddress from '../../components/mapAddress/MapAddress'
import Footer from '../../layouts/footer'

function ContactPage() {


  return (
    <div>
      <Header />
      <PageTitleBox title={'CONTACT'}/> 
      <MapAddress />
      <Footer />

    </div>
  )
}

export default ContactPage