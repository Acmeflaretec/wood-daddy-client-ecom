import React from 'react';
import {
  List, ListItem, ListItemText, Divider, Chip, Button,
  Card, CardContent, Typography, Box,
  ListItemAvatar,
  Avatar,
  Grid
} from '@mui/material';

function OrderList({ orders, onOrderClick }) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" align="center">You haven't placed any orders yet.</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary">Start Shopping</Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <List>
      {orders?.map((order) => (
        <React.Fragment key={order?._id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Grid display={"flex"} justifyContent={'space-between'}>
                <Typography variant="caption">
                  Order #{order?._id}
                </Typography>
                <Typography variant="caption" px={2}>
                  Ordered on {new Date(order?.createdAt)?.toDateString()}
                </Typography>
                </Grid>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    Total: ₹ {order?.Totalamount?.toFixed(2)}
                  </Typography>
                  <br />
                  Order Status : <Chip label={order?.status} color="primary" size="small" />
                </>
              }
            />
            <Button variant="outlined" onClick={() => onOrderClick(order?._id)}>
              View Details
            </Button>
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

export default OrderList;