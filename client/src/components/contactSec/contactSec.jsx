import React from "react";
import "./index.css";

function ContactSec() {
  return (
    <div className="ContactSec">
      <div className="contactBox">
        <h1 className="ctitle" style={{ color: "white", fontSize: "60px" }}>
          Contact Us
        </h1>
        <p style={{ color: "white", fontSize: "18px" }}>
          You can call us any time
        </p>
        <div className="salesBtn"> Call Us Now!</div>
      </div>
      <div
        className="contactImg"
        style={{
          backgroundImage: "url(/gallery/b2.jpg)",
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          color: "white",
        }}
      ></div>
    </div>
  );
}

export default ContactSec;
