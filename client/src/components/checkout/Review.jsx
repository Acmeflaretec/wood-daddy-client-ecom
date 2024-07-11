import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Review({ products, address }) {
  const {
    firstname,
    lastname,
    country,
    address_line_1,
    address_line_2,
    city,
    state,
    zip,
    mobile,
  } = address;
  function truncateText(text, maxLength) {
    const words = text?.split("");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join("") + "...";
    }
    return text;
  }
  return (
    <Stack spacing={2}>
      <List disablePadding>
        {products?.map((product) => (
          <>
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${product?.image?.[0]}`}
                alt={""}
                style={{ height: "30px", width: "30px", marginRight: "4px" }}
              />
              <ListItemText
                sx={{ mx: 2 }}
                primary={product.name}
                secondary={truncateText(product.subheading, 60)}
              />
              <Typography
                variant="body1"
                fontWeight="medium"
                style={{ marginRight: "4px" }}
              >
                {`qty x${product?.cartDetails?.[0]?.qty}`}
              </Typography>
              <Typography p={1} variant="body1" fontWeight="medium">
                {`₹  ${product.sale_rate}`}
              </Typography>
            </ListItem>
          </>
        ))}
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>
            {firstname} {lastname}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {`${address_line_1}, ${address_line_2}`}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {`${city}, ${state}, ${country}`}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {`pin: ${zip}`}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {`ph: ${mobile}`}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
}
