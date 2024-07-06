import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Button, Grid, Card, CardContent, Box,
  CardMedia, Divider, Stepper, Step, StepLabel, StepContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
}));

const OrderInfoCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[3],
}));

const ItemCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const SummaryCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <InventoryIcon />,
    2: <LocalShippingIcon />,
    3: <CheckCircleIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

const getOrderSteps = () => {
  return ['Processing', 'Shipped', 'Delivered'];
};

const getActiveStep = (status) => {
  const steps = getOrderSteps();
  return steps.indexOf(status);
};

function SingleOrder({ order, onClose }) {
  if (!order) return null;

  const steps = getOrderSteps();
  const activeStep = getActiveStep(order.status);

  return (
    <StyledDialog open={!!order} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order #{order.id} Details</DialogTitle>
      <DialogContent>
        <OrderInfoCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Order Date:</strong> {order.date}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Status:</strong> {order.status}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Shipping Address:</strong>
                </Typography>
                <Typography variant="body2">{order.shippingAddress}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </OrderInfoCard>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Typography variant="h6" color={index === activeStep ? "primary" : "textSecondary"}>
                  {label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography>
                  {index === activeStep ? `Your order is currently ${label.toLowerCase()}.` : ''}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Typography variant="h6" style={{ marginTop: 20, marginBottom: 10 }}>
          Items:
        </Typography>
        <Grid container spacing={2}>
          {order.items.map((item, index) => (
            <Grid item xs={12} key={index}>
              <ItemCard variant="outlined">
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3} sm={2}>
                      <CardMedia
                        component="img"
                        height="80"
                        image={item.image}
                        alt={item.name}
                      />
                    </Grid>
                    <Grid item xs={9} sm={10}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${item.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </ItemCard>
            </Grid>
          ))}
        </Grid>

        <SummaryCard>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Typography variant="body1">
            Subtotal: ${order.subtotal.toFixed(2)}
          </Typography>
          <Typography variant="body1">
            Shipping: ${order.shipping.toFixed(2)}
          </Typography>
          <Typography variant="body1">
            Tax: ${order.tax.toFixed(2)}
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="h6">
            Total: ${order.total.toFixed(2)}
          </Typography>
        </SummaryCard>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default SingleOrder;