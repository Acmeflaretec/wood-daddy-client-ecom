/* eslint-disable react/prop-types */
import { useState } from 'react';
import Box from 'components/Box';
import Typography from 'components/Typography';
import Table from 'examples/Tables/Table';
import { Avatar, Select, MenuItem } from '@mui/material';
import Badge from 'components/Badge';
import { Link } from 'react-router-dom';
import { Icon } from "@mui/material";
import { useGetOrders, useUpdateOrderStatus } from 'queries/OrderQuery';

// function Blogs({ key, image, name, category, qty, totalPrice }) {
//   console.log("pass value ", key, image, name, category, qty, totalPrice);
//   return (
//     <Box display="flex" key={key} alignItems="center" px={1} py={0.5}>
//       <Box mr={2}>
//         <Avatar src={image} alt={name} size="sm" variant="rounded" />
//       </Box>
//       <Box display="flex" flexDirection="column">
//         <Typography variant="button" fontWeight="medium">
//           {name}
//         </Typography>
//         <Typography variant="caption" color="secondary">
//           {category}
//         </Typography>
//         <Typography variant="caption" color="secondary">
//           Quantity: {qty}
//         </Typography>
//         <Typography variant="caption" color="secondary">
//           Total Price: ${totalPrice}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

const TableData = () => {
  const { data, isLoading } = useGetOrders({ pageNo: 1, pageCount: 100 });
  // console.log("data", data);
  const { mutate: updateOrderStatus,isLoading: deleting  } = useUpdateOrderStatus();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus({ orderId, newStatus });
  };

  const columns = [
    { name: 'User', align: 'left' },
    { name: 'PaymentMode', align: 'center' },
    { name: 'Amount', align: 'center' },
    { name: 'orderPerson', align: 'center' },
    { name: 'Ordered', align: 'center' },
    { name: 'Status', align: 'center' },
    { name: 'Action', align: 'center' },
  ];

  const rows = data?.data?.map(item => ({
    User: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.userId?.firstName} {item?.userId?.lastName}({item?.userId?.mail})
      </Typography>
    ),
    PaymentMode: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.payment_mode}
      </Typography>
    ),
    Amount: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        ${item?.Totalamount}
      </Typography>
    ),
    orderPerson: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.address?.firstname} {item?.address?.lastname}
      </Typography>
    ),
    // Products: item?.products?.item.map(product => (
    //   console.log('product', product),
    //   <Blogs
    //     key={product.product_id._id}
    //     image={`${process.env.REACT_APP_API_URL}/uploads/${product.product_id.image[0]}`}
    //     name={product.product_id.name}
    //     category={product.product_id.category}
    //     qty={product.qty}
    //     totalPrice={product.price * product.qty}
    //   />
      
    // )),
    Status: (
      <Select
        value={item?.status}
      onChange={(e) => handleStatusChange(item._id, e.target.value)}
      >
        {['Pending', 'Placed', 'Shipped', 'Out_of_delivery', 'Delivered', 'Delayed', 'Canceled'].map(status => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    ),
    Ordered: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.createdAt).toDateString()}
      </Typography>
    ),
    Action: (
      // <Link to={`/orders/editOrder/${item?._id}`}>
      <Link to={`/orders/editOrder/${item?._id}`} state={{ item }}>
      <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
        more_vert
      </Icon>
    </Link>
    ),
  }));

  return isLoading ? (
    <Typography fontSize={14} sx={{ paddingX: 5 }}>
      Loading...
    </Typography>
  ) : (
    <Table columns={columns} rows={rows} />
  );
};

export default TableData;

