import React, { useState, useEffect } from "react";
import "./index.css";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";

function HomeCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/category/selectedcategories` );
        setCategories(response?.data?.data);
        console.warn(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategory = async (e, cat) => {
    if (cat) {
      navigate(`/productfetch?cat=${cat}`);
    }
  };

  //`${process.env.REACT_APP_API_URL}/uploads/${}`
  return (
    <div className="HomeCategory">
      {categories.slice(0, 3).map((obj, index) => (
        <div
          className="catBox"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_API_URL}/uploads/${obj?.image})`,
          }}
          onClick={(e) => handleCategory(e, obj._id)}
        >
          <h2>{obj.name}</h2>
          <p>{obj.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default HomeCategory;