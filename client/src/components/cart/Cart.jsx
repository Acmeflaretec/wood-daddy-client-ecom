import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import "./card.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Divider, Grid, Stack, Typography } from "@mui/material";

function Cart({ setNotif }) {
  const [quantity, setQuantity] = useState(1);
  const [TotalAmnt, setTotalAmnt] = useState(0);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  //

  const [details, setDetails] = useState([]);
  const [usersId, setUsersId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/auth/getuser`
      );
      setUsersId(response?.data.data[0]._id);
      console.log("userrrr", response.data.data[0]._id);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (usersId) {
      const urlQuery = `/cart/${usersId}?page=1&sortField=createdAt&sortOrder=desc`;
      // Now you can use the urlQuery for further data fetching or processing
      console.log("URL Query:", urlQuery);
      // You can also fetch data here if needed
      const fetchCartData = async () => {
        try {
          const response = await axiosInstance.get(urlQuery);
          setDetails(response?.data?.products);
          convertToServerFormat(response.data.products);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchCartData();
    }
  }, [usersId]);

  //

  const incrementQuantity = async (id, stock, qty, numberIndex) => {
    console.log("iddd", id);
    try {
      if (qty < stock) {
        await axiosInstance.put(
          `/cart/increase/${id}`
        );
        // Fetch updated order items
        const response = await axiosInstance.get(
          `/cart/${usersId}?page=1&limit=6&sortField=createdAt&sortOrder=desc`
        );
        // console.log('ress cart',response.data)
        setDetails(response?.data?.products);
        convertToServerFormat(response?.data?.products);
        setNotif((prev) => !prev);
      }
    } catch (error) {}
    // setQuantity(quantity + 1);
  };

  const decrementQuantity = async (id, stock, qty, numberIndex) => {
    try {
      if (qty > 1) {
        await axiosInstance.put(
          `/cart/decrease/${id}`
        );
        const response = await axiosInstance.get(
          `/cart/${usersId}?page=1&limit=6&sortField=createdAt&sortOrder=desc`
        );
        //  console.log('ress cart',response.data)
        setDetails(response?.data?.products);
        convertToServerFormat(response?.data?.products);
        setNotif((prev) => !prev);
      }
    } catch (error) {}
  };

  const handleCardClick = (prodId) => {
    navigate(`/product/${prodId}`);
  };

  const removeCart = async (e, proId) => {
    e.preventDefault();
    console.log("proid", proId);
    try {
      const response = await axiosInstance.delete(
        `/cart/${usersId}/${proId}`
      );

      setDetails(details?.filter((item) => item._id !== proId));
      convertToServerFormat(details?.filter((item) => item._id !== proId));
      setNotif((prev) => !prev);
    } catch (error) {
      console.log("err", error);
    }
  };

  function convertToServerFormat(details) {
    const products = details?.map((item) => ({
      product_id: item._id, // Assuming _id represents the product ID
      qty: item.cartDetails.length > 0 ? item.cartDetails[0].qty : 0, // Assuming qty is taken from cartDetails
      sale_rate: item.sale_rate,
      price:item.price,
    }));

    const totalPrice = products.reduce(
      (acc, curr) => acc + curr.qty * curr.price,
      0
    );
    const totalSalePrice = products.reduce(
      (acc, curr) => acc + curr.qty * curr.sale_rate,
      0
    );
    setAmount(totalPrice)
    setTotalAmnt(totalSalePrice);
    return {
      item: products,
      totalSalePrice,
    };
  }
  function truncateText(text, maxLength) {
    const words = text?.split("");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join("") + "...";
    }
    return text;
  }
  return (
    <>
      <Box p={{ xs: 2, lg: 11 }} px={{ lg: 24 }}>
        <Grid container columnSpacing={4}>
          <Grid container item xs={12} md={7}>
            {details &&
              details.map((pro, index) => (
                <Grid
                  // container
                  item
                  xs={12}
                  // boxShadow={1}
                  border={0.1}
                  borderRadius={2}
                  minHeight={180}
                  key={index}
                  sx={{
                    marginBottom: "24px",
                    // backgroundColor: "yellow",
                    padding: "16px",
                  }}
                >
                  <Grid
                    container
                    // spacing={3}
                  >
                    <Grid
                      item
                      xs={5}
                      sm={4}
                      md={3}
                      display={"flex"}
                      justifyContent={"center"}
                      // sx={{backgroundColor:'gray'}}
                      // border={1}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${pro?.image[0]}`}
                        height={100}
                        width={80}
                        alt="Product"
                        onClick={() => handleCardClick(pro?._id)}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={7}
                      md={9}
                      sx={{ backgroundColor: "" }}
                    >
                      <Stack>
                        <Typography>{pro?.name}</Typography>
                        <Typography fontSize={"small"}>
                          {truncateText(pro?.subheading, 55)}
                        </Typography>
                        <Grid container>
                          {pro?.stock > 0 && (
                            <Typography color={"green"} pr={2}>
                              In stock
                            </Typography>
                          )}
                          <Typography style={{ color: "gray" }}>
                            sold by{" "}
                            <span style={{ color: "#0066C0" }}>
                              {pro?.brand}
                            </span>
                          </Typography>
                        </Grid>
                        <Grid container alignItems={"baseline"}>
                          <Typography
                            fontSize={"medium"}
                            color={"gray"}
                            sx={{ textDecoration: "line-through" }}
                          >
                            ₹{pro?.price}
                          </Typography>
                          <Typography style={{ fontSize: "18px" }} px={1}>
                            ₹{pro?.sale_rate}
                          </Typography>
                          <Typography color={"green"}>
                            {pro?.discount}% off
                          </Typography>
                        </Grid>
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      display={"flex"}
                      alignItems={"center"}
                      pt={2}
                      // sx={{ backgroundColor: "red" }}
                    >
                      <Grid item xs={6} md={4} px={2}>
                        <Fab
                          size="small"
                          sx={{ maxWidth: "35px", maxHeight: "30px" }}
                          aria-label="decrease"
                          onClick={() =>
                            decrementQuantity(
                              pro.inCart._id,
                              pro.stock,
                              pro.cartDetails[0].qty,
                              index
                            )
                          }
                        >
                          <RemoveIcon />
                        </Fab>
                        <span style={{ fontSize: "22px", padding: "15px" }}>
                          {pro?.cartDetails?.[0]?.qty}
                        </span>
                        <Fab
                          size="small"
                          sx={{ maxWidth: "35px", maxHeight: "30px" }}
                          aria-label="increase"
                          onClick={() =>
                            incrementQuantity(
                              pro.inCart._id,
                              pro.stock,
                              pro.cartDetails[0].qty,
                              index
                            )
                          }
                        >
                          <AddIcon />
                        </Fab>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="standard"
                          size="small"
                          color="secondary"
                          onClick={(e) => removeCart(e, pro._id)}
                        >
                          Remove item
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>

          <Grid item xs={12} md={5}>
            {details?.length > 0 && (
              <Grid container border={0.1} borderRadius={2} minHeight={300} p={2}>
                <Grid item display={"flex"} xs={12}>
                  <ReceiptIcon />
                  <Typography>Order Summary</Typography>
                </Grid>
                <Divider />
                <Grid item xs={7} md={9}>
                  <Typography pb={1}>Price ({details?.length} items)</Typography>
                  <Typography pb={1}>Discount</Typography>
                  <Divider />
                  <Typography py={1} fontSize={'large'}>Total Amount</Typography>
                </Grid>
                <Grid item xs={5} md={3}>
                  <Typography pb={1}>₹ {amount}</Typography>
                  <Typography pb={1}>- ₹ {amount-TotalAmnt}</Typography>
                  <Divider />
                  <Typography py={1} fontSize={'large'}>₹ {TotalAmnt}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="warning" fullWidth onClick={()=>navigate('/order')}>
                    Proceed to Checkout
                  </Button>
                  <Typography pt={2} color={'green'}>You will save ₹{amount-TotalAmnt} on this order</Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>

        {details.length <= 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "50px",
            }}
          >
            <Typography pb={1}>Oops! your shopping cart is empty</Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => navigate(`/productfetch?allProducts=allProducts`)}
            >
              Add Items
            </Button>
          </div>
        )}
        <Divider />
      </Box>
    </>
  );
}

export default Cart;
