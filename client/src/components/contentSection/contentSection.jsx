import React, { useState, useEffect } from "react";
import "./index.css";
import axiosInstance from "../../axios";

function ContentSection() {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/contentSection`);
        setContent(response?.data?.data?.[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="contentSection">
      <h2
        className="title"
        style={{
          color: "#6e6e6e",
          fontFamily: "cursive",
          padding: 0,
          margin: 0,
        }}
      >
        {content?.title}
      </h2>
      <p
        className="contentPara"
        style={{ color: "#888", fontFamily: "cursive" }}
      >
        {content?.desc}{" "}
      </p>
    </div>
  );
}

export default ContentSection;
