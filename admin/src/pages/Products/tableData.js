/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import toast from 'react-hot-toast';
import Table from "examples/Tables/Table";
import { useGetProducts } from "queries/ProductQuery";

const notify = () => toast.success('category deleted successfully.');
function Author({ image, name, desc }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption" color="secondary">
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

const TableData = () => {
  const { data, isLoading } = useGetProducts({ page: 1, limit: 100 });

  useEffect(()=>{
   console.log('pro data :',data?.products)
  },[])

  const columns = [
    { name: "product", align: "left" },
    { name: "status", align: "center" },
    { name: "createdon", align: "center" },
    { name: "Lastupdated", align: "center" },
    { name: "action", align: "center" },
  ]

  const rows = data?.products?.map(item => ({
    product: <Author image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image?.[0]}`} name={item?.name} desc={item?.subheading} />,
    status: (
      <Badge variant="gradient" badgeContent={item?.isAvailable ? 'Available' : 'Unavailable'} color={item?.isAvailable ? "success" : 'secondary'} size="xs" container />
    ),
    createdon: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.createdAt).toDateString()}
      </Typography>
    ),
    Lastupdated: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.updatedAt).toDateString()}
      </Typography>
    ),
    action: (
      <>
        <Typography
          component="a"
          href="#"
          onClick={notify}
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </Typography>
        <Typography
          component="a"
          href="#"
          onClick={notify}
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Delete
        </Typography>
      </>
    ),
  }))
  return isLoading ? <>loading...</> : <Table columns={columns} rows={rows} />
};

export default TableData;
