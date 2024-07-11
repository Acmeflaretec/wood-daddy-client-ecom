import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import { Receipt } from "@mui/icons-material";

function Info({ total, subtotal, item }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Order Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {`Rs ${total}`}
      </Typography>
      <Grid item xs={12}>
        {item > 0 && (
          <Grid container border={0.1} borderRadius={2} minHeight={300} p={2}>
            <Grid item display={"flex"} xs={12}>
              <Receipt />
              <Typography>Order Summary</Typography>
            </Grid>
            <Divider />
            <Grid item xs={7} md={9}>
              <Typography pb={1}>Price ({item} items)</Typography>
              <Typography pb={1}>Discount</Typography>
              <Divider />
              <Typography py={1} fontSize={"large"}>
                Total subtotal
              </Typography>
            </Grid>
            <Grid item xs={5} md={3}>
              <Typography pb={1}>₹ {subtotal}</Typography>
              <Typography pb={1}>- ₹ {subtotal - total}</Typography>
              <Divider />
              <Typography py={1} fontSize={"large"}>
                ₹ {total}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography pt={1} color={"green"}>
                You will save ₹{subtotal - total} on this order
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
