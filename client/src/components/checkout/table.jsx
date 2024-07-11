import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export default function SpanningTable({ productDetails }) {
  function truncateText(text, maxLength) {
    const words = text?.split("");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join("") + "...";
    }
    return text;
  }
  return (
    <List disablePadding>
      {productDetails.map((product) => (
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
          <Divider />
        </>
      ))}
    </List>
  );
}
