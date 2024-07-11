import React from "react";
import "./index.css";
import { Typography } from "@mui/material";

function HistorySec() {
  return (
    <div className="AboutSec">
      <div className="content">
        <h1 style={{ color: "gray" }}>Our history</h1>
        <Typography p={2}>
          WoodDaddy was born out of a deep appreciation for fine woodworking and
          a desire to bring artisanal quality furniture to discerning customers.
          Our journey began with a simple belief: that furniture should be more
          than just functional—it should be a work of art that enhances your
          home and reflects your unique style.
        </Typography>

        <Typography p={2}>
          At WoodDaddy, our mission is to provide you with exceptional furniture
          that combines timeless design with unparalleled craftsmanship. We
          believe in creating pieces that are not only beautiful but also
          durable and sustainable. Our goal is to offer a curated selection of
          furniture that meets the highest standards of quality and aesthetic
          appeal.
        </Typography>
        <Typography p={2}>
          At WoodDaddy, we believe that our customers deserve the best. We are
          dedicated to providing exceptional customer service and ensuring that
          your shopping experience is seamless and enjoyable. Our knowledgeable
          team is always ready to assist you with any questions or concerns you
          may have. Thank you for choosing WoodDaddy. We are honored to be a
          part of your home and look forward to helping you create spaces that
          you love.
        </Typography>
      </div>
      <img src="/gallery/a2.jpg" alt="" style={{ height: "600px" }} />
    </div>
  );
}

export default HistorySec;
