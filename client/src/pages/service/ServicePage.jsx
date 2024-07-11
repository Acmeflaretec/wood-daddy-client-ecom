import React from "react";
import ServiceSec from "../../components/serviceSec/ServiceSec";
import PageTitleBox from "../../common/pageTitleBox/PageTitleBox";
import Service from "../../components/service-sec/service";
import ContentSection from "../../components/contentSection/contentSection";
import ContactSec from "../../components/contactSec/contactSec";

function ServicePage() {
  const title = "We provide the best services";
  const para =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut leo a justo faucibus vestibulum. Morbi tristique velit eget nulla viverra, nec condimentum libero venenatis. Aliquam erat volutpat. Sed sit amet sapien in libero tempus vulputate.";

  return (
    <>
      <PageTitleBox title={"SERVICE"} />
      <ServiceSec />
      <Service />
      <ContentSection title={title} para={para} />
      <ContactSec />
    </>
  );
}

export default ServicePage;
