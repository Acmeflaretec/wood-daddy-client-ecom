import  React,{useState,useEffect} from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('chair ', 2, 3000),
  createRow('table', 1, 20000),
  createRow('sofa', 2, 50000),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable({productDetails,setProductDetails}) {

  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  var urlQuery = `http://localhost:5000/api/v1/cart/664db80748eeadcd76759a55?page=1&sortField=createdAt&sortOrder=desc`;

  const handleQuantityChange = async (id, action) => {
    //console.log('iddd', id);
    try {
      if (action === 'increment') {
        await axiosInstance.put(`http://localhost:5000/api/v1/cart/increase/${id}`);
      } else if (action === 'decrement') {
        await axiosInstance.put(`http://localhost:5000/api/v1/cart/decrease/${id}`);
      }

      // Fetch updated order items
      const response = await axiosInstance.get(urlQuery);
      setProductDetails(response.data.products);
    } catch (error) {
      console.error(`Error ${action === 'increment' ? 'incrementing' : 'decrementing'} order item quantity:`, error);
    }
  };
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">discount</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">total price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productDetails.map((obj,index) => (
            <TableRow key={index}>
              <TableCell>{obj.name}</TableCell>
              <TableCell align="right">
                {/* {row.qty} */}

                <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginBottom: 2,
        },
        '& .MuiBadge-root': {
          marginRight: 4,
        },
      }}
    >
      <div>
        <Badge color="secondary" badgeContent={obj.cartDetails[0].qty}>
          <ShoppingBagIcon />
        </Badge>
        <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => handleQuantityChange(obj.inCart._id, 'decrement')}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => handleQuantityChange(obj.inCart._id, 'increment')}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </Box>

                </TableCell>
              <TableCell align="right">{obj.discount}</TableCell>
              <TableCell align="right">{ccyFormat(obj.sale_rate)}</TableCell>
              <TableCell align="right">{ccyFormat(obj.sale_rate*obj.cartDetails[0].qty)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
