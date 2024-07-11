import React from "react";
import Banner from "../../components/banner/banner";
import Service from "../../components/service-sec/service";
import OfferSale from "../../components/offerSale/offerSale";
import ContentSection from "../../components/contentSection/contentSection";
import ContactSec from "../../components/contactSec/contactSec";
import HomeCategory from "../../components/homecategory/homeCategory";
import ProductScroll from "../../components/productScroll/ProductScroll";

function Home() {
  return (
    <>
      <Banner />
      <ContentSection />
      <HomeCategory />
      <OfferSale />
      <ProductScroll type={"home"} />
      <ContactSec />
      <Service />
    </>
  );
}

export default Home;
