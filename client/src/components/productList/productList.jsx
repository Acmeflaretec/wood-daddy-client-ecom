import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import "./index.css";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductCard from "../productScroll/ProductCard";
import { Backdrop, CircularProgress, Grid, Snackbar } from "@mui/material";

function ProductList(props) {
  const { title, type, recentf, searchItem, categ, allProds, setNotif } = props;
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [latest, setLatest] = useState("");
  const [disc, setDisc] = useState("");
  const [sortRate, setsortRate] = useState("");
  const [usersId, setUsersId] = useState();

  const [sortInit, setSortInit] = useState("desc");
  const [lessPrice, setLessPrice] = useState(null);
  const [grtDisc, setGrtDisc] = useState(null);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let urlQuery = ``;
  if (recentf)
    urlQuery = `/products?page=${page}&limit=9&sortField=createdAt&sortOrder=desc&uid=${localStorage.getItem(
      "UID"
    )}`;

  if (searchItem)
    urlQuery = `/products?page=${page}&limit=9&search=${searchItem}&sortField=createdAt&sortOrder=${sortInit}&uid=${localStorage.getItem(
      "UID"
    )}`;

  if (type === "productFetch") {
    urlQuery = `/products?page=${page}&limit=9&category=${categ}&sortField=createdAt&sortOrder=${sortInit}&uid=${localStorage.getItem(
      "UID"
    )}`;
    if (lessPrice) {
      urlQuery = urlQuery + `&priceLessThan=${lessPrice}`;
    }
    if (grtDisc) {
      urlQuery = urlQuery + `&sortDiscountGreaterThan=${grtDisc}`;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/auth/getuser`);
        setUsersId(response.data.data[0]._id);
        //   console.log("userrrr", response.data.data[0]._id);
      } catch (error) {
        console.log("prlist err", error);
      }
    };
    fetchData();
  }, []);
  const getData = async () => {
    // if(!urlQuery) return
    if (type === "wishlist") {
      console.log("type wishlist");
      if (usersId)
        urlQuery = `/wishlist/${usersId}/wishlist?page=${page}&limit=6&sortField=createdAt&sortOrder=desc`;
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(urlQuery);
          console.log("wish ", response.data);
          setDetails(response.data.products);
          setTotalPages(Math.ceil(response.data.totalProducts / 10));
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      setDetails(null);
      const fetchData = async () => {
        try {
          if (allProds === "allProducts") {
            const response = await axiosInstance.get(
              `/products?page=${page}&limit=9&uid=${localStorage.getItem(
                "UID"
              )}`
            );

            console.log("all prods  reached ", response.data.products);
            setTotalPages(Math.ceil(response.data.totalProducts / 10));
            setDetails(response.data.products);
            
          } else {
            console.log("urlll", urlQuery);
            const response = await axiosInstance.get(urlQuery);

            console.log("data reached ", response.data.products);
            setTotalPages(Math.ceil(response.data.totalProducts / 10));
            setDetails(response.data.products);
            
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
    setLoading(false)
  };
  useEffect(() => {
    setLoading(true)
    getData();
  }, [page, usersId, latest, sortRate, disc, searchItem]);

  const handleSortChange = (event) => {
    console.log("changed", event.target.value);
    setDetails(null);
    if (event.target.value === 10) {
      setSortInit("desc");
      setLatest(event.target.value);
    } else if (event.target.value === 20) {
      setSortInit("asc");
      setLatest(event.target.value);
    }
  };
  const handleDiscChange = (event) => {
    console.log("clicked", event.target.value);

    setDetails(null);
    console.log("changed", event.target.value);
    if (event.target.value === 10) {
      setDisc(event.target.value);
      setGrtDisc(40);
    }
    if (event.target.value === 20) {
      setDisc(event.target.value);
      setGrtDisc(50);
    }
    if (event.target.value === 30) {
      setDisc(event.target.value);
      setGrtDisc(60);
    }
    if (event.target.value === 40) {
      setDisc(event.target.value);
      setGrtDisc(70);
    }
  };

  const handleRateChange = (event) => {
    setDetails(null);
    console.log("changed", event.target.value);
    if (event.target.value === 10) {
      setsortRate(event.target.value);
      setLessPrice(1000);
    }
    if (event.target.value === 20) {
      setsortRate(event.target.value);
      setLessPrice(5000);
    }
    if (event.target.value === 30) {
      setsortRate(event.target.value);
      setLessPrice(10000);
    }
    if (event.target.value === 40) {
      setsortRate(event.target.value);
      setLessPrice(15000);
    }
    if (event.target.value === 50) {
      setsortRate(event.target.value);
      setLessPrice(20000);
    }
  };

  // const handleDiscClick = (event) => {
  //   console.log('clicked',event.target.value)
  // };
  // const handleSortClick = (event) => {
  //   console.log('clicked',event.target.value)
  // };
  // const handleRateClick = (event) => {
  //   console.log('clicked',event.target.value)
  // };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const addCart = async (proId) => {
    console.log("proid", proId);
    try {
      const response = await axiosInstance.post(`/cart/${usersId}/${proId}`);
      //  setDetails({ ...details, inCart: true });
      setLoading(true);
      await getData();
      setLoading(false);
      setSnackBarMessage("added to cart");
      setOpen(true);
    } catch (error) {
      console.log("err", error);
    }
  };

  const addWishlist = async (e, proId) => {
    e.preventDefault();
    console.log("proid", proId);
    try {
      const response = await axiosInstance.post(
        `/wishlist/${usersId}/${proId}/wishlist`
      );
      // setDetails({ ...details, inWishlist: true });
      setLoading(true);
      await getData();
      setLoading(false);
      setSnackBarMessage("added to wishlist");
      setOpen(true);
    } catch (error) {
      console.log("err", error);
    }
  };
  const removeWishlist = async (e, proId) => {
    e.preventDefault();
    console.log("proid", proId);
    try {
      const response = await axiosInstance.delete(
        `/wishlist/${usersId}/${proId}/wishlist`
      );
      // setDetails({ ...details, inWishlist: false });
      setLoading(true);
      await getData();
      setLoading(false);
      setSnackBarMessage("removed from wishlist");
      setOpen(true);
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <div className="ProductsBox">
      <div className="Title">
        <h1 style={{ color: "#6e6e6e" }}>{title}</h1>
      </div>

      {type === "productFetch" && allProds != "allProducts" ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">discount</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={disc}
                label="discount"
                onChange={handleDiscChange}
                // onClick={handleDiscClick}
              >
                <MenuItem value={10}>greater than 40%</MenuItem>
                <MenuItem value={20}>greater than 50%</MenuItem>
                <MenuItem value={30}>greater than 60%</MenuItem>
                <MenuItem value={40}>greater than 70%</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={latest}
                label="Sort"
                onChange={handleSortChange}
                // onClick={handleSortClick}
              >
                <MenuItem value={10}>Latest</MenuItem>
                <MenuItem value={20}>Oldest</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rate</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortRate}
                label="Sort"
                onChange={handleRateChange}
                // onClick={handleRateClick}
              >
                <MenuItem value={10}>lesser than 1000</MenuItem>
                <MenuItem value={20}>lesser than 5000</MenuItem>
                <MenuItem value={30}>lesser than 10000</MenuItem>
                <MenuItem value={40}>lesser than 15000</MenuItem>
                <MenuItem value={50}>lesser than 20000</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      ) : (
        ""
      )}

      <div className="ProductList">
        <Grid
          container
          spacing={4}
          sx={{ display: "inline-flex" }}
          px={{ xs: 3, sm: 5 }}
          justifyContent={{ xs: "center", sm: "start" }}
        >
          {details &&
            details.map((pro, index) => (
              <Grid item sm={6} md={4} lg={3}>
                <ProductCard
                  key={index}
                  data={pro}
                  user={!!usersId}
                  addCart={addCart}
                  addWishlist={addWishlist}
                  removeWishlist={removeWishlist}
                />
              </Grid>
            ))}
        </Grid>
        <div className="pagination">
          {details?.length ? (
            !recentf ? (
              <Stack pt={5}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            ) : null
          ) : (
            <Typography>{loading ? <CircularProgress color="inherit" /> :"No Results found !"}</Typography>
          )}
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message={snackBarMessage}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ProductList;
