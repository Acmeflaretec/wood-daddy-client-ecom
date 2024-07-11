import React from "react";
import PageTitleBox from "../../common/pageTitleBox/PageTitleBox";
import AboutSec from "../../components/aboutSec/AboutSec";
import OfferSale from "../../components/offerSale/offerSale";
import HistorySec from "../../components/historySec/HistorySec";
import ContactSec from "../../components/contactSec/contactSec";
import ContentSection from "../../components/contentSection/contentSection";

function AboutPage() {
  const title = "Quote";
  const para = `"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut leo a justo faucibus vestibulum. Morbi tristique velit eget nulla viverra, nec condimentum libero venenatis. Aliquam erat volutpat. Sed sit amet sapien in libero tempus vulputate."`;

  return (
    <>
      <PageTitleBox title={"ABOUT US"} />
      <AboutSec />
      <OfferSale />
      <HistorySec />
      <ContactSec />
      <ContentSection title={title} para={para} />
    </>
  );
}

export default AboutPage;
