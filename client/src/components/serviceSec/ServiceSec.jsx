import React from "react";
import "./index.css";
import { Typography } from "@mui/material";

function ServiceSec() {
  return (
    <div className="AboutSec">
      <img src="/gallery/a1.jpg" alt="" />
      <div className="content">
        <h1 style={{ color: "gray" }}>What we provide</h1>
        <Typography p={2}>
          At WoodDaddy, we offer a range of services designed to enhance your
          experience and ensure you receive the best possible value from our
          products. Our commitment to excellence extends beyond our furniture to
          the services we provide, ensuring your satisfaction from the moment
          you browse our collection to the time your new piece is delivered and
          set up in your home.
        </Typography>
        <Typography p={2}>
          We understand that every home is unique, and sometimes you need
          something special to complete your space. Our custom furniture design
          service allows you to bring your vision to life. Work with our skilled
          designers to create a piece that perfectly matches your style,
          dimensions, and functional needs. From selecting the type of wood to
          choosing the finish and detailing, we ensure your custom piece is
          exactly what you envisioned.
        </Typography>
        <Typography p={2}>
          We offer reliable and efficient delivery services to ensure your
          furniture arrives safely and on time. Our professional team handles
          your items with care, providing white-glove delivery services that
          include unpacking and assembling your furniture in your desired
          location. We take care of the heavy lifting so you can enjoy your new
          furniture without the hassle.
        </Typography>
        <Typography p={2}>
          As part of our commitment to sustainability, we offer eco-friendly
          disposal services for your old furniture. When you purchase new items
          from WoodDaddy, we can help you responsibly dispose of or recycle your
          old furniture, reducing waste and minimizing environmental impact.
        </Typography>
        <Typography p={2}>
          Our dedicated customer support team is here to assist you at every
          step of your journey with WoodDaddy. From answering product inquiries
          to providing after-sales support, we are committed to ensuring your
          complete satisfaction. Contact us via phone, email, or live chat for
          prompt and friendly assistance.
        </Typography>
      </div>
    </div>
  );
}

export default ServiceSec;
