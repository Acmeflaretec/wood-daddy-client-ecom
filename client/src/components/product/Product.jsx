import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ProductScroll from "../../components/productScroll/ProductScroll";
import "./product.css";
import ActiveLastBreadcrumb from "../../common/breadCrums/breadCrums";
import AccordionBox from "../accordion/Accordion";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";

import { useSwipeable } from "react-swipeable";

function Product({ setNotifM }) {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const productId = searchParams.get('productId');

  const [details, setDetails] = useState([]);
  const [usersId, setUsersId] = useState();
  const navigate = useNavigate();

  const [state, setState] = useState(details);

  const [activeIndex, setActiveIndex] = useState(0);

  //console.log('slider ',details.image[activeIndex])

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % details.image.length);
  };

  const handleBack = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + details.image.length) % details.image.length
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
  });

  //

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/getuser`
      );
      setUsersId(response.data.data[0]._id);
      //console.log('userrrr',response.data.data[0]._id)
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      setDetails(response?.data?.product);
      console.log("prooo", response?.data?.product);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addCart = async (e, proId) => {
    e.preventDefault();
    console.log("proid", proId);
    try {
      const response = await axiosInstance.post(`/cart/${usersId}/${proId}`);
      setDetails({ ...details, inCart: true });
    } catch (error) {
      console.log("err", error);
    }
  };
  const removeCart = async (e, proId) => {
    e.preventDefault();
    console.log("proid", proId);
    try {
      const response = await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}/${proId}`
      );
      setDetails({ ...details, inCart: false });
    } catch (error) {
      console.log("err", error);
    }
  };
  const addWishlist = async (e, proId) => {
    e.preventDefault();
    console.log("proid", proId);
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/wishlist/${usersId}/${proId}/wishlist`
      );
      setDetails({ ...details, inWishlist: true });
    } catch (error) {
      console.log("err", error);
    }
  };
  const removeWishlist = async (e, proId) => {
    e.preventDefault();
    console.log("proid", proId);
    try {
      const response = await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/wishlist/${usersId}/${proId}/wishlist`
      );
      setDetails({ ...details, inWishlist: false });
    } catch (error) {
      console.log("err", error);
    }
  };
  function truncateText(text, maxLength) {
    //console.log(text)
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  }

  return (
    <Grid px={{xs:3,md:10}} my={10}>
      <div className="proSub">
        <div className="imgFrame">
          <img
            src={
              details && details.image && details.image.length > 0
                ? `${process.env.REACT_APP_API_URL}/uploads/${details.image[activeIndex]}`
                : ""
            }
            alt={`Product Image`}
          />

          <div className="nav-button">
            <IconButton className="prev" onClick={handleBack}>
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton className="next" onClick={handleNext}>
              <KeyboardArrowRight />
            </IconButton>
          </div>
        </div>

        <div className="proContents">
          <Grid>
            <Typography fontSize={{xs:20,md:22}}>
              <span style={{ fontSize: 24 }}>{details.name}</span> (
              {details.subheading})
            </Typography>

            <Typography pb={2} fontSize={14}>
              manufactured by {details.brand}
            </Typography>
          </Grid>
          <Typography fontSize={32}>₹ {details.sale_rate}</Typography>
          <Typography fontSize={24}>
            <span style={{ textDecorationLine: "line-through" }}>
              ₹ {details.price}
            </span>
            <span className="dcnt"> {details.discount}% off</span>{" "}
          </Typography>

          {details?.stock <= 10 ? (
            <p className="warning">Hurry up! only {details.stock} left</p>
          ) : (
            ""
          )}
          {details?.stock > 0 && <p style={{ color: "green" }}>In stock</p>}

          {details && details.description ? (
            <Typography color="gray">
              {truncateText(details?.description, 50)}
            </Typography>
          ) : (
            ""
          )}
          <div className="button-container">
            {!details?.inCart ? (
              <button
                className="add-to-cart-button"
                onClick={
                  usersId
                    ? (e) => addCart(e, details._id)
                    : () => navigate("/login")
                }
              >
                Add Cart
              </button>
            ) : (
              <button
                className="add-to-cart-button"
                onClick={() => navigate("/cart")}
              >
                Go To Cart
              </button>
            )}

            {!details.inWishlist ? (
              <button
                className="add-to-wishlist-button"
                onClick={
                  usersId
                    ? (e) => addWishlist(e, details._id)
                    : () => navigate("/login")
                }
              >
                Add Wishlist
              </button>
            ) : (
              <button
                className="add-to-wishlist-button"
                onClick={() => navigate("/wishlist")}
              >
                View Wishlist
              </button>
            )}
          </div>
          <AccordionBox accDetails={details} />
        </div>
      </div>
    </Grid>
  );
}

export default Product;
