import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./AddressForm";
import getCheckoutTheme from "./getCheckoutTheme";
import Info from "./Info";
import InfoMobile from "./InfoMobile";
import Review from "./Review";
import SpanningTable from "./table";

const steps = ["order details", "Shipping address", "Review your order"];

export default function Checkout() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const [usersId, setUsersId] = useState();
  const [shippingAddress, setShippingAddress] = useState({});
  const [order, setOrder] = useState({});
  const [totalAmt, setTotalAmt] = useState(0);
  const [amount, setAmount] = useState(0);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  const [addressDetailsM, setAddressDetailsM] = useState();
  const [primaryAddressesM, setPrimaryAddressesM] = useState();
  const [formDataM, setFormDataM] = useState({
    firstname: "",
    lastname: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip: "",
    primary: true,
    country: "",
    mobile: "",
  });

  useEffect(() => {
    if (usersId) {
      const query = `/address/address/${usersId}`;
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(query);
          setAddressDetailsM(response?.data);
          const filterAddresses = await response?.data?.filter(
            (address) => address.primary === true
          );
          setPrimaryAddressesM(filterAddresses?.[0]);
          console.log(filterAddresses?.[0]);
          console.log("adddd", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [usersId]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/auth/getuser`);
      setUsersId(response?.data?.data?.[0]?._id);
      console.log("userrrr", response?.data?.data?.[0]?._id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (usersId) {
      const query = `/cart/${usersId}?page=1&sortField=createdAt&sortOrder=desc`;
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(query);
          setDetails(response?.data?.products);
          convertToServerFormat(response?.data?.products);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [usersId]);

  function convertToServerFormat(details) {
    const products = details?.map((item) => ({
      product_id: item._id,
      qty: item.cartDetails.length > 0 ? item.cartDetails[0].qty : 0,
      sale_rate: item.sale_rate,
      price: item.price,
    }));

    const totalPrice = products.reduce(
      (acc, curr) => acc + curr.qty * curr.price,
      0
    );
    const totalSalePrice = products.reduce(
      (acc, curr) => acc + curr.qty * curr.sale_rate,
      0
    );
    setAmount(totalPrice);
    setTotalAmt(totalSalePrice);
    return 
  }

  const handlePlaceOrder = async () => {
    try {
      const products = details?.map((item) => ({
        product_id: item._id,
        qty: item.cartDetails.length > 0 ? item.cartDetails[0].qty : 0,
        price: item.sale_rate,
      }));
      const productsData = {
        item: products,
        totalPrice: totalAmt,
      };
      console.log(productsData);
      console.log({ products: productsData, totalAmt: { totalPrice: totalAmt } });
      const response = await axiosInstance.post(
        `/order/createorder/${usersId}/${shippingAddress?._id}`,
        { products: productsData, totalAmt: { totalPrice: totalAmt } }
      );
      setActiveStep(activeStep + 1);
      setOrder(response?.data)
      console.log("Order created:", response?.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // ********* //

  const handleNext = async () => {
    console.log("act step", activeStep + 1);
    if (activeStep + 1 == 1) {
      setActiveStep(activeStep + 1);
      console.log("act1", activeStep + 1);
    }

    if (activeStep + 1 == 2) {
      console.log("act2", activeStep + 1);

      if (primaryAddressesM) {
        console.log("address present", primaryAddressesM);
        setActiveStep(activeStep + 1);
      } else {
        console.log("reached  api post");
        const postAddress = async () => {
          try {
            const response = await axiosInstance.post(
              `/address/address`,
              formDataM
            );
            setShippingAddress(response?.data);
            console.log("Address response:", response?.data);
            if (response.data) {
              setActiveStep(activeStep + 1);
            }
          } catch (error) {
            console.error("Error adding address:", error);
          }
        };

        postAddress();
        console.log("not present", primaryAddressesM);
      }
    }

    if (activeStep + 1 === 3) {
      handlePlaceOrder()
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <SpanningTable
            productDetails={details}
            setProductDetails={setDetails}
          />
        );
      case 1:
        return (
          <AddressForm
            usersProId={usersId}
            addressDetails={addressDetailsM}
            primaryAddresses={primaryAddressesM}
            formData={formDataM}
            setFormData={setFormDataM}
          />
        );
      case 2:
        return <Review products={details} address={shippingAddress} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
      <CssBaseline />
      <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: 150,
            }}
          >
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/"
              sx={{ ml: "-8px" }}
            >
              Back to Home
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info item={details?.length} total={totalAmt} subtotal={amount} />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/"
                sx={{ alignSelf: "start" }}
              >
                Back to home
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "end",
                alignItems: "flex-end",
                flexGrow: 1,
                height: 150,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  height: 40,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                ":last-child": { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">₹ {totalAmt}</Typography>
              </div>
              <InfoMobile
                item={details?.length}
                total={totalAmt}
                subtotal={amount}
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" color="text.secondary">
                  Order Successfull
                  <strong>&nbsp;#{order?._id}</strong> is the order
                  confirmation id and will update you once its shipped.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    alignSelf: "start",
                    width: { xs: "100%", sm: "auto" },
                  }}
                  onClick={handleBack}
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent:
                      activeStep !== 0 ? "space-between" : "flex-end",
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: "60px",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: "flex", sm: "none" },
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{
                      width: { xs: "100%", sm: "fit-content" },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}